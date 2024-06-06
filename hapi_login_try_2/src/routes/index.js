"use strict";

module.exports.register = async server => {
   server.route( {
       method: "GET",
       path: "/",
       handler: async ( request, h ) => {
           return "My second hapi server!";
       }
   } );
};