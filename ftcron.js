var mysql = require('mysql');



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "lovsense"
  });
con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM links WHERE timestamp < NOW() - INTERVAL 120 MINUTE";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
    });
    con.end()
  });