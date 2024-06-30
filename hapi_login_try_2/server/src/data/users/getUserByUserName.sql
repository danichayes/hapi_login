-- users.sql
-- Add this query to get user by username
SELECT user_id, user_name, user_password FROM users WHERE user_name = $1;
