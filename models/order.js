var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: make sure object referencing works

var Order = new Schema({
	ingredients: [{quantity: Number, ingredients: {type: Schema.Types.ObjectId, ref: 'Ingredient'}}],
	complete: Boolean
});

module.exports = mongoose.model('Order', Order);