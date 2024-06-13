// src/routes/api/create_user.js

"use strict";

module.exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/api/create_user",
    config: {
      handler: async (request, h) => {
        try {
          // Extract user data from the request payload
          const { userName, userPassword, email } = request.payload;

          // Get the SQL client registered as a plugin
          const db = request.server.plugins.sql.client;

          // Execute the query to create a new user
          const res = await db.users.createUser(userName, userPassword, email);

          // Return a success message
          return h.response({ message: "User created successfully!" }).code(201);
        } catch (err) {
          console.log(err);
          return h.response({ error: "Failed to create user" }).code(500);
        }
      },
    },
  });
};
