var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
});

var pool = mysql.createPool({ 
  host: 'localhost', 
  user: 'root', 
  password: '', 
  connectionLimit: 100 
});

con.connect(function (err) {
  if (err) throw err;
  console.log('MySQL connection established!');
});

module.exports = con;
module.exports.pool = pool;