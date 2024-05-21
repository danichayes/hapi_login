"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "users" );

   const getUser = async userId => {
       // get a connection to SQL Server
       const cnx = await getConnection();

       // create a new request
       const request = await cnx.request();

       // configure sql query parameters
       request.input( "userId", sql.VarChar( 50 ), userId );

       // return the executed query
       return request.query( sqlQueries.getUser );
   };

   return {
       getUser
   };
};

module.exports = { register };