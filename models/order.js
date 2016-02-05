var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: make sure object referencing works

var Order = new Schema({
	_id: {type: String},
	ingredients: [{quantity: Number, name: String}],
	complete: Boolean,
	cost: Number
}, {collection: 'Order'});

module.exports = mongoose.model('Order', Order);