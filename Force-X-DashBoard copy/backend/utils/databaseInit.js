const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }

  console.log('✅ Connected to MySQL server');

  // Create database
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('❌ Database creation failed:', err);
      return;
    }
    console.log(`✅ Database '${process.env.DB_NAME}' ready`);

    // Use database
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        console.error('❌ Database selection failed:', err);
        return;
      }

      // Create tables
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS registered_users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          mobile VARCHAR(15) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role ENUM('BD executive', 'TL', 'TM') NOT NULL,
          isApproved BOOLEAN DEFAULT FALSE,
          forgot_password_token VARCHAR(100) NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;

      const createLoginLogsTable = `
        CREATE TABLE IF NOT EXISTS login_logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          username VARCHAR(50) NOT NULL,
          status ENUM('SUCCESS', 'FAILED') NOT NULL,
          login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES registered_users(id) ON DELETE SET NULL
        )
      `;

      connection.query(createUsersTable, (err) => {
        if (err) {
          console.error('❌ Users table creation failed:', err);
          return;
        }
        console.log('✅ Users table ready');

        connection.query(createLoginLogsTable, (err) => {
          if (err) {
            console.error('❌ Login logs table creation failed:', err);
            return;
          }
          console.log('✅ Login logs table ready');
          console.log('🎉 Database initialization completed!');
          connection.end();
        });
      });
    });
  });
});