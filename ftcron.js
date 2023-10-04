var mysql = require('mysql');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    //password: process.env.password,
    database: process.env.DATABASE
  });
con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM links WHERE timestamp < NOW() - INTERVAL 10 MINUTE";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
    });
    con.end()
  });