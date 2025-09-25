const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --------------------
// CORS setup
// --------------------
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions)); // ✅ handles preflight automatically

// --------------------
// Middleware
// --------------------
app.use(express.json());

// --------------------
// Routes
// --------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));

// --------------------
// Health check
// --------------------
app.get("/api/health", (req, res) => {
  console.log("Health check route was hit ✅");
  res.json({ message: "Force-X Backend is running!" });
});

// --------------------
// Error handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// --------------------
// 404 handler
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Force-X Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});
