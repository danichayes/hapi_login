"use strict";

const users = require("./users");
const { Pool } = require("pg");

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
                // Has the connection pool already been created?
                // If so, return the existing pool
                console.log('returning pool')
                return pool;
            }

            // Create a new connection pool
            pool = new Pool(config);

            // Catch any connection errors and close the pool
            pool.on("error", async (err) => {
                server.log(["error", "data"], "connection pool error");
                server.log(["error", "data"], err);
                await closePool();
            });

            return pool;
        } catch (err) {
            // Error connecting to PostgreSQL
            server.log(["error", "data"], "error connecting to PostgreSQL");
            server.log(["error", "data"], err);
            pool = null;
        }
    };

    // This is the API the client exposes to the rest
    // of the application
    return {
        users: await users.register({ sql: Pool, getConnection })
    };
};

module.exports = client;
