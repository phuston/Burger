var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredient.js')

/* GET ingredient listing. */
router.get('/', function(req, res, next) {
  Ingredient.find({}).exec(function(err, ingredients) {
    console.log(ingredients)
    res.render('ingredients', { Ingredients: ingredients });
  });
});

router.post('/add', function(req, res, next) {
  var newIngredient = {
    name: req.body.name,
    cost: req.body.cost,
    $inc: {quantity: req.body.quantity}
  }
  Ingredient.findOneAndUpdate({name: req.body.name}, newIngredient, {upsert: true}, function(err, item){
    message = req.body.name + " added successfully!"
    res.render('success', {Message: message})
  })
});

router.post('/update', function(req, res, next) {
  console.log(req.body.name)
  Ingredient.findOneAndUpdate({name: req.body.name}, {$inc: {quantity: 5}}, {upsert: true}, function(err, item) {
    console.log(item);
    res.json({Status: 'Success'})
  })
})

module.exports = router;
