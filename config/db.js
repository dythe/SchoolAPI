const mysql = require('mysql');
const constants = require('../utils/constants');

const host = 'localhost';
const user = 'root';
const password = '';
let pool = '';

async function createNewDBConnection(databaseName) {
  pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: databaseName,
    connectionLimit: 100
  });
  console.log("Currently using database %s", databaseName);

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(pool), 1000)
  });

  return promise;
}

module.exports.pool = pool;
module.exports.createNewDBConnection = createNewDBConnection;