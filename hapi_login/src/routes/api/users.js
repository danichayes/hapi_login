"use strict";

module.exports.register = async (server) => {
    server.route({
        method: "GET",
        path: "/api/users",
        config: {
            handler: async (request) => {
                try {
                    // Get the pg client registered as a plugin
                    const db = request.server.plugins.pg.client;

                    const userId = 1;

                    // Call the getUser function to retrieve user information
                    const user = await getUser(userId, db);

                    // Return the user object
                    return user;
                } catch (err) {
                    console.error(err);
                    throw err; // Rethrow the error to be caught by the framework
                }
            },
        },
    });
};

