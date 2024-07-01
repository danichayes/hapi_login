"use strict";

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const loadSqlQueries = async (folderName) => {
    const filePath = path.join(__dirname, folderName);
    const files = await fs.promises.readdir(filePath);

    const queries = {};

    for (const file of files) {
        if (file.endsWith('.sql')) {
            const queryName = path.parse(file).name;
            const queryPath = path.join(filePath, file);
            const queryText = await fs.promises.readFile(queryPath, { encoding: 'utf-8' });
            queries[queryName] = queryText;
        }
    }

    return queries;
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
};

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        });
    });
};



module.exports = {
    loadSqlQueries,
    hashPassword,
    comparePassword
};

