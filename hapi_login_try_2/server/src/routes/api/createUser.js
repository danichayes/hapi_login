

"use strict";
const {hashPassword} = require('../../data/utils');

module.exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/api/createUser",
    config: {
      handler: async (request, h) => {
        try {
          // Extract user data from the request payload
          const { userName, userPassword, email } = request.payload;

          // Hash the password with the salt
          console.log(hashPassword)
          const hashedPassword = await hashPassword(userPassword);

          // Get the SQL client registered as a plugin
          const db = request.server.plugins.sql.client;


          // Execute the query to create a new user
          const res = await db.users.createUser(userName, hashedPassword, email);

          // Log the result
          console.log(`Create user result: ${res}`);

          // Return a success message
          return h.response({ message: "User created successfully!" }).code(201);
        } catch (err) {
          if (err.message === 'A user with this username or email already exists.') {
            return h.response({ error: err.message }).code(409); // Conflict status code
            }
            console.log(err);
            return h.response({ error: "Failed to create user" }).code(500);
        }
      },
    },
  });
};