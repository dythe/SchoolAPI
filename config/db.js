var mysql = require('mysql');
var db = require('../utils/queries');
var constants = require('../utils/constants');

var host = 'localhost';
var user = 'root';
var password = '';

// Set database to normal db
db.CURRENT_DATABASE.currentDatabase = constants.NORMAL_SCHOOL;

var con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  multipleStatements: true
});

var pool = mysql.createPool({ 
  host: host, 
  user: user, 
  password: password, 
  connectionLimit: 100 
});


module.exports = con;
module.exports.pool = pool;