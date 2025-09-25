from flask import Flask, request, render_template, send_file, jsonify
import pandas as pd
from datetime import datetime
import logging
import os
import json
import urllib.request
import urllib.error
import time
from flask_cors import CORS
import pdfkit
import mysql.connector   # ✅ MySQL connector

app = Flask(__name__)
CORS(app)

# Enable detailed logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Gemini API Key
API_KEY = 'AIzaSyC-0BB1_UWhZuYw8U92mS0QgeHa7rH_764'

# ✅ MySQL Config
db_config = {
    "host": "localhost",
    "user": "root",          # change if needed
    "password": "root@123",  # replace with your MySQL password
    "database": "gchat_db"
}


# ---------- UTILS ----------
def _coerce_amount_to_number(raw_amount):
    """Convert various amount formats to float."""
    if raw_amount is None:
        return 0.0
    if isinstance(raw_amount, (int, float)):
        return float(raw_amount)
    try:
        text = str(raw_amount)
        for sym in ["$", "₹", "€", "£"]:
            text = text.replace(sym, " ")
        import re
        match = re.search(r"[-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[-+]?\d+(?:\.\d+)?", text)
        if not match:
            return 0.0
        number_str = match.group(0).replace(",", "")
        return float(number_str)
    except Exception:
        return 0.0


def call_gemini_api(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
    
    system_prompt = (
        "You are a data extraction assistant for Ciel HR. Parse a meeting log and return a single valid JSON object "
        "with fields: 'person_name', 'company', 'client_email', 'client_mobile', 'agenda', 'location', "
        "'distance', 'travel_mode', 'meeting_notes', 'lead_conversion', and 'expenses'. "
        "The 'expenses' field is a list of objects, each with 'name' and 'amount'."
        "Use 'N/A' for missing fields. Use Yes or No or Neutral for 'lead_conversion' field."
    )

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generation_config": {"response_mime_type": "application/json"}
    }
    
    retries, max_retries = 0, 5
    headers = {"Content-Type": "application/json"}
    data_bytes = json.dumps(payload).encode("utf-8")

    while retries < max_retries:
        try:
            req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
            with urllib.request.urlopen(req) as resp:
                resp_body = resp.read().decode("utf-8")
                return json.loads(resp_body)
        except urllib.error.HTTPError as err:
            if err.code == 429 and retries < max_retries - 1:
                wait_time = 2 ** retries
                logging.info(f"Rate limit hit. Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
                retries += 1
            else:
                raise
        except urllib.error.URLError:
            raise


# ---------- PARSER ----------
def parse_message(msg_text):
    try:
        gemini_response = call_gemini_api(msg_text.strip())
        json_text = gemini_response['candidates'][0]['content']['parts'][0]['text']
        structured_data = json.loads(json_text)
        
        # Process expenses
        expenses = structured_data.get('expenses', [])
        total_expense, food_total, travel_total = 0, 0, 0
        food_keywords = {"food","meal","breakfast","lunch","dinner","snack","coffee","tea","beverage","drinks","juice"}
        travel_keywords = {"travel","taxi","cab","uber","ola","bus","metro","train","flight","airfare","plane","parking","fuel","petrol","diesel","toll","auto","rickshaw","bike","car","scooter","transport","fare","ride"}
        
        for exp in expenses:
            name_original = (exp.get('name') or 'Misc').strip()
            amount_num = _coerce_amount_to_number(exp.get('amount', 0))
            total_expense += amount_num
            name_lc = name_original.lower()
            
            if any(kw in name_lc for kw in food_keywords):
                food_total += amount_num
            elif any(kw in name_lc for kw in travel_keywords):
                travel_total += amount_num

        now = datetime.now()
        return {
            "Sender Name": "N/A",  # filled later
            "Sender Email": "N/A", # filled later
            "Person Met": structured_data.get('person_name', 'N/A'),
            "Company": structured_data.get('company', 'N/A'),
            "Client Email": structured_data.get('client_email', 'N/A'),
            "Client Mobile No": structured_data.get('client_mobile', 'N/A'),
            "Agenda": structured_data.get('agenda', 'N/A'),
            "Location": structured_data.get('location', 'N/A'),
            "Distance": structured_data.get('distance', 'N/A'),
            "Travel Mode": structured_data.get('travel_mode', 'N/A'),
            "Meeting Notes": structured_data.get('meeting_notes', 'N/A'),
            "Lead Conversion": structured_data.get('lead_conversion', 'No'),
            "Food Expenses": food_total,
            "Travel Expenses": travel_total,
            "Total Expenses": total_expense,
            "Date": now.strftime("%Y-%m-%d"),
            "Time": now.strftime("%H:%M:%S")
        }
    except Exception as e:
        logging.error(f"Error parsing message: {e}")
        return None


# ---------- DATABASE ----------
def insert_message_to_db(record):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        sql = """
        INSERT INTO meeting_details (
            sender_name, sender_email, person_met, company, client_email, client_mobile_no,
            agenda, location, distance, travel_mode, meeting_notes, lead_conversion,
            food_expenses, travel_expenses, total_expenses, date, time
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            record.get("Sender Name"),
            record.get("Sender Email"),
            record.get("Person Met"),
            record.get("Company"),
            record.get("Client Email"),
            record.get("Client Mobile No"),
            record.get("Agenda"),
            record.get("Location"),
            record.get("Distance"),
            record.get("Travel Mode"),
            record.get("Meeting Notes"),
            record.get("Lead Conversion"),
            record.get("Food Expenses"),
            record.get("Travel Expenses"),
            record.get("Total Expenses"),
            record.get("Date"),
            record.get("Time")
        )

        cursor.execute(sql, values)
        conn.commit()
        cursor.close()
        conn.close()
        logging.info("✅ Message inserted into MySQL successfully.")
    except Exception as e:
        logging.error(f"❌ Failed to insert message into DB: {e}")


def fetch_all_messages():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM meeting_details ORDER BY id DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    except Exception as e:
        logging.error(f"❌ Failed to fetch messages from DB: {e}")
        return []


# ---------- ROUTES ----------
@app.route("/webhook", methods=["POST"])
def webhook():
    logging.info("=== Webhook hit ===")
    data = request.json
    logging.debug("Received raw JSON: %s", data)

    try:
        event_type = data.get("type", "")
        msg = data.get("message", {})
        sender_info = msg.get("sender", {})

        sender = sender_info.get("displayName", "Unknown")
        email = sender_info.get("email", "Unknown")
        text = msg.get("text", "")

        if event_type == "MESSAGE":
            parsed_data = parse_message(text)
            
            if parsed_data:
                parsed_data["Sender Name"] = sender
                parsed_data["Sender Email"] = email
                insert_message_to_db(parsed_data)

            return jsonify({"text": f"👋 Hi {sender}, I parsed your message successfully!"})

        elif event_type == "ADDED_TO_SPACE":
            return jsonify({"text": "✅ Thanks for adding me!"})

        elif event_type == "REMOVED_FROM_SPACE":
            return jsonify({"text": "👋 Bye! I've been removed."})

        else:
            return jsonify({"text": "⚠️ Event received but not handled."})

    except Exception as e:
        logging.error("❌ Error processing webhook: %s", e, exc_info=True)
        return jsonify({"text": "❌ Internal server error"}), 500


@app.route("/")
def index():
    messages = fetch_all_messages()
    display_columns = [col for col in messages[0].keys()] if messages else []
    return render_template("index.html", messages=messages, columns=display_columns)


@app.route("/download-excel")
def download_excel():
    messages = fetch_all_messages()
    if not messages:
        return "No messages to export", 400
    df = pd.DataFrame(messages)
    filename = "meeting_details.xlsx"
    df.to_excel(filename, index=False)
    return send_file(filename, as_attachment=True)


@app.route("/download-pdf")
def download_pdf():
    messages = fetch_all_messages()
    if not messages:
        return "No messages to export", 400

    html_content = "<html><head><style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ddd;padding:8px;}th{background:#f2f2f2;}</style></head><body>"
    html_content += "<h2>Parsed Messages Report</h2><table><thead><tr>"
    for key in messages[0].keys():
        html_content += f"<th>{key}</th>"
    html_content += "</tr></thead><tbody>"
    for msg in messages:
        html_content += "<tr>" + "".join([f"<td>{v}</td>" for v in msg.values()]) + "</tr>"
    html_content += "</tbody></table></body></html>"

    pdf_filename = "meeting_details.pdf"
    pdfkit.from_string(html_content, pdf_filename)
    return send_file(pdf_filename, as_attachment=True)


if __name__ == "__main__":
    app.run(port=9000, debug=True)
