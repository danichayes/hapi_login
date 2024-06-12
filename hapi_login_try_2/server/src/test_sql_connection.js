const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new Pool instance with the PostgreSQL configuration
const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

// Perform a test query to check database connection
async function testDatabaseConnection() {
    try {
        // Connect to the database pool
        const client = await pool.connect();

        // Execute a simple query to check the database connection
        const res = await client.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
        console.log(res.rows[0].message); // Print the result

        // Release the client back to the pool
        client.release();
    } catch (err) {
        console.error('Error executing query:', err);
    } finally {
        // Close the pool to end the process
        await pool.end();
    }
}

// Call the function to test the database connection
testDatabaseConnection();
