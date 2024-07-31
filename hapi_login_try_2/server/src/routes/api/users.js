"use strict";

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/{username}",
        config: {
            handler: async (request, h) => {
                try {
                    console.log('ENTERING USER SCREEN');
                    const username = request.params.username;
                    const db = request.server.plugins.sql.client;
                    const res = await db.users.getUserByUserName(username);
                    
                    console.log('Query Result:', res);

                    if (res.length === 0) {
                        console.log('User not found');
                        return h.response({ error: "User not found" }).code(404);
                    }

                    console.log('User found:', res);
                    return h.response(res).code(200);
                } catch (err) {
                    console.log('Error fetching user:', err);
                    return h.response({ error: "Failed to fetch user" }).code(500);
                }
            }
        }
    });
};
