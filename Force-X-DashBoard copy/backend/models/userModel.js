// models/userModel.js
const db = require('../config/database');

const userModel = {
  // Create a new user
  create: async (userData) => {
    const { username, email, mobile, password_hash, role } = userData;
    
    const [result] = await db.execute(
      `INSERT INTO registered_users (username, email, mobile, password_hash, role) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, mobile, password_hash, role]
    );
    
    return result;
  },

  // Find user by ID
  findById: async (id) => {
    const [rows] = await db.execute(
      "SELECT id, username, email, mobile, role, isApproved, created_at FROM registered_users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  },

  // Find user by username
  findByUsername: async (username) => {
    const [rows] = await db.execute(
      "SELECT * FROM registered_users WHERE username = ?",
      [username]
    );
    return rows[0] || null;
  },

  // Find user by email
  findByEmail: async (email) => {
    const [rows] = await db.execute(
      "SELECT * FROM registered_users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  },

  // Find user by mobile
  findByMobile: async (mobile) => {
    const [rows] = await db.execute(
      "SELECT * FROM registered_users WHERE mobile = ?",
      [mobile]
    );
    return rows[0] || null;
  },

  // Find user by username and role
  findByUsernameAndRole: async (username, role) => {
    const [rows] = await db.execute(
      "SELECT * FROM registered_users WHERE username = ? AND role = ?",
      [username, role]
    );
    return rows[0] || null;
  },

  // Get all users (for admin)
  findAll: async () => {
    const [rows] = await db.execute(
      "SELECT id, username, email, mobile, role, isApproved, created_at FROM registered_users ORDER BY created_at DESC"
    );
    return rows;
  },

  // Get pending users (not approved)
  findPending: async () => {
    const [rows] = await db.execute(
      "SELECT id, username, email, mobile, role, created_at FROM registered_users WHERE isApproved = FALSE"
    );
    return rows;
  },

  // Approve user by ID
  approve: async (userId) => {
    const [result] = await db.execute(
      "UPDATE registered_users SET isApproved = TRUE WHERE id = ?",
      [userId]
    );
    return result;
  },

  // Update user password
  updatePassword: async (userId, passwordHash) => {
    const [result] = await db.execute(
      "UPDATE registered_users SET password_hash = ? WHERE id = ?",
      [passwordHash, userId]
    );
    return result;
  },

  // Set forgot password token
  setForgotPasswordToken: async (email, token) => {
    const [result] = await db.execute(
      "UPDATE registered_users SET forgot_password_token = ? WHERE email = ?",
      [token, email]
    );
    return result;
  },

  // Reset password using token
  resetPasswordWithToken: async (token, passwordHash) => {
    const [result] = await db.execute(
      "UPDATE registered_users SET password_hash = ?, forgot_password_token = NULL WHERE forgot_password_token = ?",
      [passwordHash, token]
    );
    return result;
  },

  // Find user by reset token
  findByResetToken: async (token) => {
    const [rows] = await db.execute(
      "SELECT id, email FROM registered_users WHERE forgot_password_token = ?",
      [token]
    );
    return rows[0] || null;
  },

  // Delete user by ID
  delete: async (userId) => {
    const [result] = await db.execute(
      "DELETE FROM registered_users WHERE id = ?",
      [userId]
    );
    return result;
  },

  // Update user profile
  updateProfile: async (userId, updateData) => {
    const { email, mobile } = updateData;
    const [result] = await db.execute(
      "UPDATE registered_users SET email = ?, mobile = ? WHERE id = ?",
      [email, mobile, userId]
    );
    return result;
  },

  // Log login attempt
  logLoginAttempt: async (userId, username, status) => {
    const [result] = await db.execute(
      "INSERT INTO login_logs (user_id, username, status) VALUES (?, ?, ?)",
      [userId, username, status]
    );
    return result;
  },

  // Get login logs for a user
  getLoginLogs: async (userId) => {
    const [rows] = await db.execute(
      "SELECT * FROM login_logs WHERE user_id = ? ORDER BY login_time DESC",
      [userId]
    );
    return rows;
  },

  // Check if username, email, or mobile already exists
  checkExisting: async (username, email, mobile) => {
    const [rows] = await db.execute(
      `SELECT username, email, mobile FROM registered_users 
       WHERE username = ? OR email = ? OR mobile = ?`,
      [username, email, mobile]
    );
    return rows;
  }
};

module.exports = userModel;