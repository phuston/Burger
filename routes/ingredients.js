var express = require('express');
var router = express.Router();

var format = require('string-format')
format.extend(String.prototype, {})

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
    quantity: req.body.quantity
  }
  Ingredient.findOneAndUpdate({name: req.body.name}, {$setOnInsert : newIngredient}, {upsert: true}, function(err, item){

    if(item){
      insert = false;
      html = null;
    } else {
      insert = true;
      html = '<tr><td class="name">{0}</td><td class="cost">{1}</td><td class="quan">{2}</td><td><input class="add" type="button" value="Add 5"></td><td><input class="remove" type="button" value="X"> </td><td><input class="edit" type="button" value="Edit"> </td>'.format(req.body.name, req.body.cost, req.body.quantity)
    }
    var data = {Insert: insert, row: html};

    res.json(data);
  })
});

router.post('/add', function(req, res, next) {
  console.log(req.body.name)
  Ingredient.findOneAndUpdate({name: req.body.name}, {$inc: {quantity: 5}}, {upsert: true}, function(err, item) {
    console.log(item);
    res.json({Status: 'Success'})
  })
})

router.post('/edit', function(req, res, next) {
  console.log(req.body)

  var newIngredient = {
    $set: {
      quantity: Number(req.body.quantity),
      cost: Number(req.body.price)  
    }
  }

  Ingredient.findOneAndUpdate({name: req.body.name}, newIngredient, {upsert: true}, function(err, item) {
    if (err) { console.log(err) }
    console.log(item)
    res.json({Status: 'Success'})
  })
})

router.post('/remove', function(req, res, next) {
  Ingredient.remove({name: req.body.name}, function(err){
    if(err){
      console.log(err);
    }
  })
  res.json({Status: 'Success'})
})

module.exports = router;
