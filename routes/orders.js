var async = require('async');
var ObjectID = require('mongodb').ObjectID;

var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredient.js')
var Order = require('../models/order.js')

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
	var orderCost = req.body.totalCost;

	var notEnough = [];
	var orderIngredients = [];

	var calls = [];

	ingredients.forEach(function(ingredient){

		calls.push(function(callback) {
			var newIngredient = {inc: {quantity: -ingredient.quantity}}

			Ingredient.findOneAndUpdate({name: ingredient.name, quantity: {$gt: ingredient.quantity}}, newIngredient, function(err, item){
				if(err){ return callback(err); }

				if (item == null){
					notEnough.push(ingredient.name);
				} else {
					orderIngredients.push({quantity: ingredient.quantity, name: ingredient.name});
				}
				callback(null, ingredient);
			})
		})
	})	

	async.parallel(calls, function(err, result) {
    if (err){ return console.log(err); }

    var order = new Order({
    	_id: new ObjectID(),
			ingredients: orderIngredients, 
			complete: false,
			cost: orderCost
		});

		console.log("_____ORDER______")
		console.log(order)

		order.save(function(err){
			if(err){
				console.error(err);
			}
		});



	  	var body = {message: 'hello world'};
		res.set({'Content-Type': 'application/json'});
		res.send(body);
	});
});

module.exports = router;
