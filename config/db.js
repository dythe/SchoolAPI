const mysql = require('mysql');

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

  let promise = new Promise((resolve) => {
    resolve(pool)
  });

  return promise;
}

module.exports = {
  pool,
  createNewDBConnection
}