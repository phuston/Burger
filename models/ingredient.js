var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: verify that this works

var Ingredient = new Schema({
	name: String,
	quantity: Number,
	price: Number
});

module.exports = mongoose.model('Ingredient', Ingredient);