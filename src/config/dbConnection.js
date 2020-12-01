const mysql = require('mysql');

var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'main',
   port: '3307'
 });

module.exports = () => {
  return con;
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
