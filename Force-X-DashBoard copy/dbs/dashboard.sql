-- USE force_x_db;

-- # Show all tables
-- SHOW TABLES;

-- # Check registered_users table structure
-- DESCRIBE registered_users;

-- # Check login_logs table structure
-- DESCRIBE login_logs;

# View all data in registered_users
SELECT * FROM registered_users;

-- # View all data in login_logs
-- SELECT * FROM login_logs;

-- # View only pending users
-- SELECT * FROM registered_users WHERE isApproved = FALSE;