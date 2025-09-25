const db = require('../config/database');

const adminController = {
  // Get Pending Users
  getPendingUsers: async (req, res) => {
    try {
      const [users] = await db.execute(
        "SELECT id, username, email, role, created_at FROM registered_users WHERE isApproved = FALSE"
      );
      res.json(users);
    } catch (err) {
      console.error("❌ Get Pending Users Error:", err);
      res.status(500).json({ message: "Server error!" });
    }
  },

  // Approve User
  approveUser: async (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    try {
      const [result] = await db.execute(
        "UPDATE registered_users SET isApproved = TRUE WHERE id = ?",
        [userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.json({ message: "✅ User approved successfully!" });
    } catch (err) {
      console.error("❌ Approve User Error:", err);
      res.status(500).json({ message: "Server error!" });
    }
  },

  // Get All Users (for admin dashboard)
  getAllUsers: async (req, res) => {
    try {
      const [users] = await db.execute(
        "SELECT id, username, email, role, isApproved, created_at FROM registered_users ORDER BY created_at DESC"
      );
      res.json(users);
    } catch (err) {
      console.error("❌ Get All Users Error:", err);
      res.status(500).json({ message: "Server error!" });
    }
  }
};

module.exports = adminController;