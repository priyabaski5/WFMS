import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqSections = [
    {
      title: "Force-X General Information",
      items: [
        {
          question: "What is Force-X?",
          answer: "Force-X is an AI-powered, data-driven platform designed to revolutionize field operations. It transforms fragmented, manual processes into a unified, intelligent system that provides real-time visibility, automates workflows, and empowers proactive decision-making for field teams and management."
        },
        {
          question: "Who is Force-X for?",
          answer: "Force-X is designed for everyone involved in field operations, from field executives and team leads to managers, finance officers, and IT coordinators. It addresses the specific challenges and pain points of each role."
        },
        {
          question: "How does Force-X solve the problem of fragmented field operations?",
          answer: "It unifies scattered data from multiple systems into a single platform. This provides a clear, real-time view of field activities, automates tasks like data entry and reporting, and replaces manual coordination with intelligent insights."
        },
        {
          question: "What are the main benefits of using Force-X?",
          answer: "Force-X helps you gain real-time visibility into field activities, reduce wasted time and unaccounted expenses, and improve transparency between the field and the office. It also provides a centralized platform for reporting and decision-making."
        },
        {
          question: "What kind of results can we expect from using Force-X?",
          answer: "The platform is designed to drive measurable results, including up to 75% time savings from reduced manual data processing, a 3x increase in decision speed, and a 98% improvement in compliance rates."
        }
      ]
    },
    {
      title: "How Force-X Helps Your Role",
      items: [
        {
          question: "How does Force-X help field executives?",
          answer: "It streamlines administrative tasks like receipt capture and client logging with one-tap actions, allowing executives to focus on their clients instead of paperwork."
        },
        {
          question: "How does Force-X help team managers and leads?",
          answer: "Team managers and leads get a real-time dashboard with proactive alerts and AI-generated performance reports. This shifts management from a reactive to a proactive style, giving them a clear view of their entire team's operation."
        },
        {
          question: "How does Force-X benefit finance and IT teams?",
          answer: "For finance officers, it provides an integrated expense dashboard with automated compliance flags. For IT coordinators, it simplifies user management and reduces system complexity by consolidating multiple systems into one centralized platform."
        }
      ]
    },
    {
      title: "Technology and Data",
      items: [
        {
          question: "What technologies power the Force-X platform?",
          answer: "Force-X is built on a robust enterprise-grade technology stack. It uses the Gemini API for AI-powered data analysis, a MySQL Database for reliable data storage, and Power BI for interactive, real-time analytics and visualizations."
        },
        {
          question: "How does Force-X handle data?",
          answer: "The platform processes raw communication data from sources like Google Chat. The Gemini API analyzes and structures this data, which is then stored in a MySQL database. This structured data is used to provide real-time dashboards and in-depth analytics."
        },
        {
          question: "Does Force-X integrate with other systems?",
          answer: "It processes data from external communication channels (e.g., Google Chat) and centralizes it. The platform is designed to be flexible, and specific integrations will be outlined during implementation."
        }
      ]
    },
    {
      title: "Getting Started and Support",
      items: [
        {
          question: "How do we get started with Force-X for our team?",
          answer: "Force-X is deployed for your organization by the IT department. To begin using the platform, please contact your IT or Human Resources department for account creation and access. They will guide you through the initial setup and provide your login credentials."
        },
        {
          question: "Is there a training program for new users?",
          answer: "Yes, your team will receive a comprehensive onboarding and training session led by a dedicated specialist. This will cover platform navigation, key features, and best practices for your specific role."
        },
        {
          question: "Who do I contact for technical support?",
          answer: "For any technical issues, password resets, or questions about the platform's functionality, please contact the internal IT support team. You can find their contact information on the company intranet or through the internal support portal."
        },
        {
          question: "How can I provide feedback or suggest new features?",
          answer: "The Force-X platform includes a feedback feature where you can submit suggestions directly to the development team. You can also share your ideas with your team lead or manager, who will relay them to the Force-X project management team."
        },
        {
          question: "Will the Force-X platform be updated?",
          answer: "Yes, we are committed to continuously improving Force-X. We will regularly release updates and new features to enhance functionality and address user needs. Your IT department will notify you of any major changes or updates."
        }
      ]
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0029BD 0%, #f8f9fa 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="faq-container" style={{
        maxWidth: '900px',
        margin: '3rem auto',
        padding: '2rem',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'var(--primary-dark)'
        }}>
          Frequently Asked Questions (FAQ)
        </h1>

        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 style={{
              margin: '2rem 0 1rem',
              fontSize: '1.4rem',
              color: 'var(--primary)'
            }}>
              {section.title}
            </h2>
            
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} style={{ marginBottom: '1.5rem' }}>
                  <strong style={{
                    display: 'block',
                    marginBottom: '0.3rem',
                    color: 'var(--text-dark)'
                  }}>
                    {item.question}
                  </strong>
                  <p style={{ color: 'var(--text-light)' }}>
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="back-link" style={{
          display: 'block',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Link to="/login" style={{
            textDecoration: 'none',
            color: 'var(--primary-dark)',
            fontWeight: '600'
          }}>
            <i className="fas fa-arrow-left"></i> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;