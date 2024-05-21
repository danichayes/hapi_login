"use strict";

const users = require( "./user" );

module.exports.register = async server => {
   await users.register( server );
};