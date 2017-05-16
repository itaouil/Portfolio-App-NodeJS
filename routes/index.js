var express = require('express');
var router = express.Router();

// MySQL database connection
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'portfolio'
});
connection.connect();

// projects's home page
router.get('/', function(req, res, next) {

  connection.query("SELECT * FROM projects", function (err, rows) {
    if (err) throw err;
    res.render('index',  {
      projects: rows
    });
  });

});

// projects's project details
router.get('/details/:id', function(req, res, next) {

  console.log("ID", req.params.id);

  connection.query("SELECT * FROM projects WHERE id=?", req.params.id, function (err, rows) {
    if (err) throw err;
    res.render('details',  {
      project: rows[0]
    });
  });

});

module.exports = router;
