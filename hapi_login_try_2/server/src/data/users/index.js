"use strict";

const utils = require("../utils");

const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("users");

    const getUsers = async () => {
        // get a connection to PostgreSQL
        const pool = await getConnection();

        // execute the query with the provided userId
        const result = await pool.query(sqlQueries.getUsers);

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
    const getUserByUserName = async (userName, userPassword) => {

        // Get connection
        const pool = await getConnection();
        
        // Get query
        query = sqlQueries.getUserByUserName;

        try {
            const result = await pool.query(query, [userName, userPassword]);
            if (result.rows.length === 0){
                throw new Error("Username does not exist")
            }
            return result
        } catch (err){
            throw err
        }


    };

    return {
        getUsers,
        createUser,
        getUserByUserName
    };
};

module.exports = { register };
