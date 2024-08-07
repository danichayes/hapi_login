"use strict";

const users = require( "./users" );
const createUser = require("./createUser"); 
const login = require("./login")
const updateUser = require("./updateUser")

module.exports.register = async server => {
   await users.register( server );
   await createUser.register(server);
   await login.register(server);
   await updateUser.register(server);
};