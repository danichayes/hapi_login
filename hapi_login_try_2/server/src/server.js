"use strict";

const Hapi = require( "@hapi/hapi" );
const plugins = require( "./plugins" );
const routes = require( "./routes" );

const app = async config => {

   // create an instance of hapi
   const server = Hapi.server({
      host: config.host, 
      port: config.port,
      routes: {
         cors: {
            origin: ['*'], // Allow all origins
            headers: ['Accept', 'Content-Type'],
            additionalHeaders: ['X-Requested-With']
         }
      }
    });

   // store the config for later use
   server.app.config = config;

   // register plugins
   await plugins.register( server );

   // register routes
   await routes.register( server );

   return server;
};

module.exports = app;