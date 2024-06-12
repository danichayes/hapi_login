"use strict";

module.exports.register = async server => {
   server.route( {
       method: "GET",
       path: "/api/users",
       config: {
           handler: async request => {
               try {

                   // get the sql client registered as a plugin
                   const db = request.server.plugins.sql.client;

                   // TODO: Get the current authenticate user's ID
                   const userId = 1;

                   // execute the query
                   const res = await db.users.getUser( userId );
                   // return the recordset object
                   return res;
               } catch ( err ) {
                   console.log( err );
               }
           }
       }
   } );
};