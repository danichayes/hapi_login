"use strict";

const { Pool } = require('pg');
const dotenv = require('dotenv');
const utils = require('./data/utils'); // Adjust the path to your utils module
const { register } = require('./data/users'); // Adjust the path to your events module

dotenv.config();

// PostgreSQL configuration from .env file
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
});

const getConnection = async () => pool;

const runTest = async () => {
    try {  
        // Register the events module
        const { getUser } = await register({ sql: Pool, getConnection });

        // Hardcode a value for userId
        const userId = 1;

        // Call the getUser function
        const users = await getUser(userId);
        console.log('Users:', users);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the pool to end the process
        await pool.end();
    }
};

runTest();
