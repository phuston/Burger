var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: Get all orders from mongoose here
  res.render('orders', orders: orders);
});

router.post('/new', function(req, res, next) {
  // TODO: Submit a new order here
});

module.exports = router;
