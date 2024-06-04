const { Pool } = require('pg');
const dotenv = require('dotenv');
const users = require('./users');


const client = async (server, config) => {
    let pool = null;

    const closePool = async () => {
        try {
            // Try to close the connection pool
            await pool.end();

            // Set the pool to null to ensure
            // a new one will be created by getConnection()
            pool = null;
        } catch (err) {
            // Error closing the connection (could already be closed)
            // Set the pool to null to ensure
            // a new one will be created by getConnection()
            pool = null;
            server.log(["error", "data"], "closePool error");
            server.log(["error", "data"], err);
        }
    };

    const getConnection = async () => {
        try {
            if (pool) {
                // If the connection pool already exists, return it
                return pool;
            }

            dotenv.config();

            const config = {
                host: process.env.PG_HOST,
                user: process.env.PG_USER,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DATABASE,
                port: process.env.PG_PORT,
            };

            // Log the configuration to ensure it's correct
            console.log('PostgreSQL Configuration:', config);

            // Create a new connection pool
            pool = new Pool(config);

            // Catch any connection errors and close the pool
            pool.on("error", async err => {
                server.log(["error", "data"], "connection pool error");
                server.log(["error", "data"], err);
                await closePool();
            });

            return pool;
        } catch (err) {
            // Error connecting to the database
            server.log(["error", "data"], "error connecting to PostgreSQL server");
            server.log(["error", "data"], err);
            pool = null;
            throw err; // Ensure the error is raised
        }
    };

    // this is the API the client exposes to the rest
    // of the application
    return {
        users: await users.register({ pg: { Pool }, getConnection })
    };
};

module.exports = client;
