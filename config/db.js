const mysql = require('mysql');
const constants = require('../utils/constants');

const host = 'localhost';
const user = 'root';
const password = '';

// Set database to normal db
var CURRENT_DATABASE = constants.MOCK_SCHOOL;

const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  multipleStatements: true
});

const pool = mysql.createPool({ 
  host: host, 
  user: user, 
  password: password, 
  connectionLimit: 100 
});

module.exports = con;
module.exports.pool = pool;
module.exports.CURRENT_DATABASE = CURRENT_DATABASE;