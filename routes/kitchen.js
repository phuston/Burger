var express = require('express');
var router = express.Router();

var Order = require('../models/order.js')

/* GET orders listing. */
router.get('/', function(req, res, next) {
  Order.find({complete: false}).exec(function(err, orders) {
    res.render('kitchen', { Orders: orders });
  });
});

router.post('/complete', function(req, res, next) {
  console.log(req.body.id)
  Order.findOneAndUpdate({_id: req.body.id}, {$set :{complete: true}}, function(err, order){
    console.log(order);
    if(err) { console.error(err) }
    res.json({Status: "Success"})
  });
});

module.exports = router;
