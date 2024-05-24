CREATE DATABASE login_proj_db

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name varchar(100) unique,
    user_password varchar(100),
    email varchar(200) unique
);
