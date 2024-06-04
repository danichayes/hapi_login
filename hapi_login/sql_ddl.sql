CREATE DATABASE login_proj_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) UNIQUE,
    user_password VARCHAR(100),
    email VARCHAR(200) UNIQUE
);


INSERT INTO users
    (user_name, user_password, email)
    VALUES
    ('user1', 'pass1', 'email1') ,
    ('user2', 'pass2', 'email2'); 