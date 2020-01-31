var mysql = require('mysql');

var host = 'localhost';
var user = 'root';
var password = '';

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

con.connect(function (err) {
  if (err) throw err;
  console.log('MySQL connection established!');
});

module.exports = con;
module.exports.pool = pool;