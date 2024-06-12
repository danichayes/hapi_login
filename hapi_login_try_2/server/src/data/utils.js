"use strict";

const fs = require('fs');
const path = require('path');

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

module.exports = {
    loadSqlQueries,
};

