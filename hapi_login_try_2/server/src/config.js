"use strict";

const assert = require("assert");
const dotenv = require("dotenv");

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const { PORT,
   HOST,
   HOST_URL,
   COOKIE_ENCRYPT_PWD,
   PG_HOST,
   PG_DATABASE,
   PG_USER,
   PG_PASSWORD,
   PG_PORT,
} = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(COOKIE_ENCRYPT_PWD, "COOKIE_ENCRYPT_PWD configuration is required.");
assert(PG_HOST, "PG_HOST configuration is required.");
assert(PG_DATABASE, "PG_DATABASE configuration is required.");
assert(PG_USER, "PG_USER configuration is required.");
assert(PG_PASSWORD, "PG_PASSWORD configuration is required.");
assert(PG_PORT, "PG_PORT configuration is required.");

// export the configuration information
module.exports = {
   port: PORT,
   host: HOST,
   url: HOST_URL,
   cookiePwd: COOKIE_ENCRYPT_PWD,
   sql: {
       host: PG_HOST,
       database: PG_DATABASE,
       user: PG_USER,
       password: PG_PASSWORD,
       port: PG_PORT,
   },
};
