require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.SQL_USER,
  host: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: parseInt(process.env.SQL_PORT, 10),
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
    await client.end();
  } catch (err) {
    console.error("Error connecting to the database: ", err);
  }
}

testConnection();

