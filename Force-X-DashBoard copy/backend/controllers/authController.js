// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../config/database');

// const authController = {
//   // Register User
//   register: async (req, res) => {
//     const { username, email, mobile, password, role } = req.body;

//     if (!username || !email || !mobile || !password || !role) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const allowedRoles = ["BD executive", "TL", "TM"];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ error: "Invalid role! Allowed: BD executive, TL, TM" });
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
      
//       const [result] = await db.execute(
//         `INSERT INTO registered_users (username, email, mobile, password_hash, role) 
//          VALUES (?, ?, ?, ?, ?)`,
//         [username, email, mobile, hashedPassword, role]
//       );

//       res.json({ message: "✅ User registered successfully! Waiting for IT Admin approval." });
//     } catch (err) {
//       if (err.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ error: "Username, email, or mobile already exists!" });
//       }
//       console.error("❌ Registration Error:", err);
//       res.status(500).json({ error: "Server error!" });
//     }
//   },

//   // Login User/Admin
//   login: async (req, res) => {
//     const { username, password, role } = req.body;

//     if (!username || !password || !role) {
//       return res.status(400).json({ message: "Username, password, and role are required!" });
//     }

//     // IT Admin Login (hardcoded)
//     if (role === "itadmin") {
//       if (username === process.env.IT_ADMIN_USER && password === process.env.IT_ADMIN_PASS) {
//         const token = jwt.sign(
//           { username: username, role: "itadmin" },
//           process.env.JWT_SECRET,
//           { expiresIn: "1h" }
//         );

//         return res.json({
//           message: "✅ IT Admin login successful!",
//           role: "itadmin",
//           token: token
//         });
//       } else {
//         return res.status(401).json({ message: "Invalid IT Admin credentials!" });
//       }
//     }

//     // Normal User Login
//     try {
//       const [rows] = await db.execute(
//         "SELECT * FROM registered_users WHERE username = ? AND role = ?",
//         [username, role]
//       );

//       if (rows.length === 0) {
//         return res.status(401).json({ message: "Invalid username or role!" });
//       }

//       const user = rows[0];
//       const isMatch = await bcrypt.compare(password, user.password_hash);

//       // Log login attempt
//       const logStatus = isMatch ? "SUCCESS" : "FAILED";
//       await db.execute(
//         "INSERT INTO login_logs (user_id, username, status) VALUES (?, ?, ?)",
//         [user.id, username, logStatus]
//       );

//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid password!" });
//       }

//       if (!user.isApproved) {
//         return res.status(403).json({ message: "Access not yet approved by IT Admin" });
//       }

//       const token = jwt.sign(
//         { id: user.id, username: user.username, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       res.json({ token, message: "Login successful!", role: user.role });
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       res.status(500).json({ message: "Server error!" });
//     }
//   },

//   // Forgot Password
//   forgotPassword: async (req, res) => {
//     const { email } = req.body;
    
//     if (!email) {
//       return res.status(400).json({ error: "Email is required!" });
//     }

//     try {
//       const resetToken = Math.random().toString(36).substr(2, 8);

//       const [result] = await db.execute(
//         "UPDATE registered_users SET forgot_password_token = ? WHERE email = ?",
//         [resetToken, email]
//       );

//       if (result.affectedRows === 0) {
//         return res.status(400).json({ error: "Email not found!" });
//       }

//       res.json({ message: "✅ Reset token generated!", token: resetToken });
//     } catch (err) {
//       console.error("❌ Forgot Password Error:", err);
//       res.status(500).json({ error: "Server error!" });
//     }
//   },

//   // Reset Password
//   resetPassword: async (req, res) => {
//     const { token, newPassword } = req.body;
    
//     if (!token || !newPassword) {
//       return res.status(400).json({ error: "Token and new password are required!" });
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       const [result] = await db.execute(
//         "UPDATE registered_users SET password_hash = ?, forgot_password_token = NULL WHERE forgot_password_token = ?",
//         [hashedPassword, token]
//       );

//       if (result.affectedRows === 0) {
//         return res.status(400).json({ error: "Invalid or expired token!" });
//       }

//       res.json({ message: "✅ Password reset successful!" });
//     } catch (err) {
//       console.error("❌ Reset Password Error:", err);
//       res.status(500).json({ error: "Server error!" });
//     }
//   }
// };

// module.exports = authController;


// controllers/authController.js (updated to use model)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authController = {
  // Register User
  register: async (req, res) => {
    const { username, email, mobile, password, role } = req.body;

    if (!username || !email || !mobile || !password || !role) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const allowedRoles = ["BD executive", "TL", "TM"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role! Allowed: BD executive, TL, TM" });
    }

    try {
      // Check if user already exists
      const existingUsers = await userModel.checkExisting(username, email, mobile);
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "Username, email, or mobile already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      await userModel.create({
        username,
        email,
        mobile,
        password_hash: hashedPassword,
        role
      });

      res.json({ message: "✅ User registered successfully! Waiting for IT Admin approval." });
    } catch (err) {
      console.error("❌ Registration Error:", err);
      res.status(500).json({ error: "Server error!" });
    }
  },

  // Login User/Admin
  login: async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "Username, password, and role are required!" });
    }

    // IT Admin Login (hardcoded)
    if (role === "itadmin") {
      if (username === process.env.IT_ADMIN_USER && password === process.env.IT_ADMIN_PASS) {
        const token = jwt.sign(
          { username: username, role: "itadmin" },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.json({
          message: "✅ IT Admin login successful!",
          role: "itadmin",
          token: token
        });
      } else {
        return res.status(401).json({ message: "Invalid IT Admin credentials!" });
      }
    }

    // Normal User Login
    try {
      const user = await userModel.findByUsernameAndRole(username, role);

      if (!user) {
        return res.status(401).json({ message: "Invalid username or role!" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      // Log login attempt
      await userModel.logLoginAttempt(user.id, username, isMatch ? "SUCCESS" : "FAILED");

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password!" });
      }

      if (!user.isApproved) {
        return res.status(403).json({ message: "Access not yet approved by IT Admin" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, message: "Login successful!", role: user.role });
    } catch (err) {
      console.error("❌ Login Error:", err);
      res.status(500).json({ message: "Server error!" });
    }
  },

  // Forgot Password
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    try {
      const resetToken = Math.random().toString(36).substr(2, 8);

      const result = await userModel.setForgotPasswordToken(email, resetToken);

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: "Email not found!" });
      }

      res.json({ message: "✅ Reset token generated!", token: resetToken });
    } catch (err) {
      console.error("❌ Forgot Password Error:", err);
      res.status(500).json({ error: "Server error!" });
    }
  },

  // Reset Password
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required!" });
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await userModel.resetPasswordWithToken(token, hashedPassword);

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: "Invalid or expired token!" });
      }

      res.json({ message: "✅ Password reset successful!" });
    } catch (err) {
      console.error("❌ Reset Password Error:", err);
      res.status(500).json({ error: "Server error!" });
    }
  }
};

module.exports = authController;