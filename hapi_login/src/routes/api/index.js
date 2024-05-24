"use strict";

const users = require( "./users" );

module.exports.register = async server => {
   await users.register( server );
};