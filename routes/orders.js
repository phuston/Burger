var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredient.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  Ingredient.find({}).exec(function(err, ingredients) {
    console.log(ingredients)
    res.render('orders', { Ingredients: ingredients });
  });
});

router.post('/new', function(req, res, next) {
	console.log(req.body.ingredients[0]);

	var ingredients = req.body.ingredients;

	var newIngredient = {
		$inc: {quantity: -ingredient.quantity}
	}

	ingredients.each(function(ingredient){
		Ingredient.findOneAndUpdate({name: req.body.name, quantity: {$gt: ingredient.quantity}}, newIngredient, function(err, item){
			console.log(item);
		})
	})

  var body = 'hello world';
	res.set({'Content-Type': 'text/plain'});
	res.send(body);
});

module.exports = router;
