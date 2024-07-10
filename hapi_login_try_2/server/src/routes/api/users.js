"use strict";

module.exports.register = async server => {
   server.route( {
       method: "GET",
       path: "/api/{username}",
       config: {
           handler: async request => {
               try {

                    // get the sql client registered as a plugin
                    console.log('ENTERING USER SCREEN')
                    const username = request.params.username;
                    const db = request.server.plugins.sql.client;
                    const res = await db.users.getUserByUserName(username);
                    if (res.length === 0) {
                        return h.response({ error: "User not found" }).code(404);
                    }
        
                    // Return the user object
                    console.log(res)
                    return res[0];
                    
                } catch (err) {
                    console.log(err);
                    return h.response({ error: "Failed to fetch user" }).code(500);
                }
           }
       }
   } );
};