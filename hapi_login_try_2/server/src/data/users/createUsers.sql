INSERT INTO users (user_name, user_password, email)
VALUES ($1, $2, $3)
RETURNING *;