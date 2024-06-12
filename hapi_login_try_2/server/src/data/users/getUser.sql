SELECT user_id,
       user_name,
       user_password,
       email
FROM users
WHERE user_id = $1;
