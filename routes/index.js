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

// Portfolio's home page
router.get('/', function(req, res, next) {

  connection.query("SELECT * FROM portfolio", function (err, rows) {
    if (err) throw err;
    res.render('index',  {
      projects: rows
    });
  });

});

// Portfolio's project details
router.get('/details', function(req, res, next) {

  connection.query("SELECT * FROM portfolio WHERE id=?", req.query.id, function (err, row) {
    if (err) throw err;
    res.render('index',  {
      project: row[0]
    });
  });

});

module.exports = router;
