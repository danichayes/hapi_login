"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "users" );

   const getUser = async userid => {
       // get a connection to SQL Server
       try {
            // get a connection to SQL Server
            const cnx = await getConnection();
            if (!cnx) {
                throw new Error('Connection object is undefined');
            }

       // create a new request
       const request = await cnx.request();

       // configure sql query parameters
       request.input( "userid", sql.VarChar( 50 ), userid );

       // return the executed query
       return request.query( sqlQueries.getUser );
    } catch (err) {
        console.error('Error in getUser', err);
        throw err;
    }
   };

   return {
       getUser
   };
};

module.exports = { register };