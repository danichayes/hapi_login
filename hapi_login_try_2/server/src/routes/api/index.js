"use strict";

const users = require( "./users" );
const createUser = require("./createUser"); 

module.exports.register = async server => {
   await users.register( server );
   await createUser.register(server);
};