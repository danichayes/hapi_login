"use strict";

module.exports.register = async (server) => {
    server.route({
        method: "PUT",
        path: "/api/update_user/{username}",
        config: {
            handler: async (request, h) => {
                try{
                    const { username } = request.params;
                    const { userName, email} = request.payload;

                    const db = request.server.plugins.sql.client;
                    const res = await db.users.updateUser(username, userName, email);

                    if (res.rowCount === 0){
                        return h.response({ error: "User not found"}).code(404);
                    }

                    return h.response({ message: "User updated successfully"}).code(200);
                } catch (err){
                    console.error('Error updating user:', err);
                    return h.response({ error: "Failed to update user"}).code(500);
                }
            }
        },
    });
};