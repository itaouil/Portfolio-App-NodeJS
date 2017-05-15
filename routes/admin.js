var express = require('express');
var router = express.Router();

// Admin index page
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

// Admin add project page
router.get('/add', function(req, res, next) {
  res.render('admin/add');
});

module.exports = router;
