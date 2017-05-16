var express = require('express');
var router = express.Router();

// File upload
var multer = require('multer');
var upload = multer({ dest: './public/img/portfolio' });

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
  connection.query('SELECT * FROM projects', function (err, rows) {
    if (err) throw err;
    res.render('admin/index', {
      projects: rows
    });
  });
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

    connection.query('INSERT INTO projects SET ?', project, function (err, result) {
      console.log("Error:", err);
      console.log("Result:", result)
    });

    req.flash('succes_msg', 'inserted project');

    res.redirect('/admin');
  }

});

// Admin add project page
router.get('/edit/:id', function(req, res, next) {

  console.log("ID", req.params.id);

  connection.query("SELECT * FROM projects WHERE id=?", req.params.id, function (err, rows) {
    if (err) throw err;
    res.render('admin/edit',  {
      project: rows[0]
    });
  });

});

// Admin add project page
router.post('/edit/:id', function(req, res, next) {

  console.log("EDIT: ", req.params.id);

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

    if (req.file) {
      var project = {
        title: title,
        service: service,
        client: client,
        url: url,
        description: description,
        image: projectImage,
        date: date
      };
    }
    else {
      var project = {
        title: title,
        service: service,
        client: client,
        url: url,
        description: description,
        date: date
      };
    }

    connection.query('UPDATE projects WHERE id=?', req.params.id, project, function (err, result) {
      console.log("Error:", err);
      console.log("Result:", result)
    });

    req.flash('succes_msg', 'edited project');
    res.redirect('/admin');
  }

});

// Admin add project page
router.delete('/delte/:id', function(req, res, next) {

  console.log("ID", req.params.id);

  connection.query("DELETE FROM projects WHERE id=?", req.params.id, function (err, rows) {
    if (err) throw err;
    console.log('deleted ' + result.affectedRows + ' rows');
  });

  req.flash('succes_msg', 'Project deleted');
  res.sendStatus(200);

});

module.exports = router;
