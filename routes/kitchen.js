var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // TODO: Grab all uncompleted orders here.
  res.render('kitchen', { orders: orders });
});

router.get('/complete', function(req, res, next) {
  // TODO: update order to complete here
});

module.exports = router;
