const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost'
    });

    const pool = new Pool({
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
    });

    await server.register({
        plugin: {
            name: 'pg',
            register: async (server, options) => {
                server.decorate('server', 'pg', {
                    client: pool
                });
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
