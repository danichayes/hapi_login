"use strict";

const utils = require("../utils");

const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("users");

    const getUser = async (userId) => {
        // get a connection to PostgreSQL
        const pool = await getConnection();

        // execute the query with the provided userId
        const result = await pool.query(sqlQueries.getUser, [userId]);

        return result.rows; // assuming you want to return the rows of the result
    };
    const createUser = async (userName, userPassword, email) => {
        // Get a connection to PostgreSQL
        const pool = await getConnection();

        const query = sqlQueries.createUser;
        // Execute the query to create a new user
        try {
            const result = await pool.query(query, [userName, userPassword, email]);
            return result;
        } catch (err){
            if (err.code === '23505') { // Unique violation error code in PostgreSQL
                throw new Error('A user with this username or email already exists.');
            } else {
                throw err;
            }
        }
      };

    return {
        getUser,
        createUser
    };
};

module.exports = { register };
