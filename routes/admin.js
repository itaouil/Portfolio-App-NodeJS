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
router.post('/add', upload.single('image'), function(req, res, next) {

  // Get fields
  var title       = req.body.title;
  var service     = req.body.service;
  var client      = req.body.client;
  var url         = req.body.url;
  var description = req.body.description;
  var date        = req.body.date;

  // Form validation
  req.checkBody('title', 'Project title required').notEmpty();
  req.checkBody('service', 'Project type required').notEmpty();

  // Check if file uploaded
  if (req.file)
    var projectImage = req.file.filename;
  else
    var projectImage = 'noImage.jpg';

  // Validation errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('admin/add',  {
      errors: errors,
      title: title,
      service: service,
      client: client,
      url: url,
      description: description,
      date: date
    });
  }

  else {
    var project = {
      title: title,
      service: service,
      client: client,
      url: url,
      description: description,
      image: projectImage,
      date: date
    };

    var query = connection.query('INSERT INTO portfolio SET ?', project, function (err, result) {
      console.log("Error:", err);
      console.log("Result:", result)
    });

    req.flash('succes_msg', 'inserted project');

    res.redirect('/admin');
  }

});

module.exports = router;
