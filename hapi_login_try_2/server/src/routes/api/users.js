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


                   // execute the query
                   const res = await db.users.getUsers();
                   // return the recordset object
                   return res;
               } catch ( err ) {
                   console.log( err );
               }
           }
       }
   } );
//    server.route({
//         method: "POST",
//         path: "/api/users",
//         config: {
//             handler: async (request, h) => {
//                 // Handler logic here
//                 return { message: "Users grabbed" };
//             }
//         }
//     });
};