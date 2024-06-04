"use strict";

const utils = require("../utils");

const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("users");

    const getUser = async (userid) => {
        try {
            // Get a connection to PostgreSQL
            const pool = await getConnection();

            // Execute the SQL query
            const { rows } = await pool.query(sqlQueries.getUser, [userid]);

            // Return the result
            return rows[0]; // Assuming you're expecting only one user
        } catch (err) {
            console.error(err);
            throw err; // Rethrow the error to be caught by the caller
        }
    };

    return {
        getUser,
    };
};

module.exports = { register };
