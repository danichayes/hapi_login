"use strict";

const {comparePassword} = require('../../data/utils');

module.exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/api/login",
    config: {
      handler: async (request, h) => {
        try {
          // Extract user data from the request payload
          const { userName, userPassword } = request.payload;

          // Get the SQL client registered as a plugin
          const db = request.server.plugins.sql.client;

          // Execute the query to find the user by username
          const user = await db.users.getUserByUserName(userName);
          // Check if the password matches
          const match = comparePassword(userPassword, user.user_password);
          if (match) {
            return h.response({ message: "Login successful!" }).code(200);
          }
          
          return h.response({ error: "Invalid password" }).code(401);
        } catch (err) {
          console.log(err);
          return h.response({ error: err.message || "Failed to login" }).code(500);
        }
      },
    },
  });
};


