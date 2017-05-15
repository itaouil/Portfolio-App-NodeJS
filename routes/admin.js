var express = require('express');
var router = express.Router();

// File upload
var multer = require('multer');
var upload = multer({ dest: '../public/img/portfolio' });

// MySQL database connection
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'portfolio'
});
connection.connect();

// Admin index page
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

// Admin add project page
router.get('/add', function(req, res, next) {
  res.render('admin/add');
});

// Admin add project page (post)
router.get('/add', upload.single('projectImage'), function(req, res, next) {

  // Get fields
  var title       = req.body.title;
  var service     = req.body.service;
  var client      = req.body.client;
  var description = req.body.description;
  var projectDate = req.body.projectDate;

  // Form validation
  req.checkBody('title', 'Project title required').notEmpty();
  req.checkBody('service', 'Project type required').notEmpty();

  // Validation errors
  var errors = validationErrors();

  if (errors) {
    res.render('admin/add',  {
      errors: errors,
      title: title,
      service: service,
      client: client,
      description: description,
      projectDate: projectDate
    });
  }

});

module.exports = router;
