var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kavice' });
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Kavice' });
});


/* GET home page. */
router.get('/1', function(req, res, next) {
  res.render('index', { title: '1 Kavice' });
});

/* GET home page. */
router.get('/2', function(req, res, next) {
  res.render('index', { title: '2 Kavice' });
});

module.exports = router;