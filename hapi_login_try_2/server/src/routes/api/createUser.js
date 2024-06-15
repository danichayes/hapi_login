

"use strict";

module.exports.register = async (server) => {
  server.route({
    method: "POST",
    path: "/api/createUser",
    config: {
      handler: async (request, h) => {
        try {
          // Extract user data from the request payload
          const { userName, userPassword, email } = request.payload;

          // Get the SQL client registered as a plugin
          const db = request.server.plugins.sql.client;


          // Execute the query to create a new user
          const res = await db.users.createUser(userName, userPassword, email);

          // Log the result
          console.log(`Create user result: ${res}`);

          // Return a success message
          return h.response({ message: "User created successfully!" }).code(201);
        } catch (err) {
            console.error(`Error creating user: ${err.message}`);
            return h.response({ error: "Failed to create user" }).code(500);
        }
      },
    },
  });
};