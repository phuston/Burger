var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: make sure object referencing works

// A couple of comments here:
	//  You don't have to specify "_id" as a key to your model. Mongoose autogenerates 
	// an id for each of your new elements in your schema
	// Instead of referencing the value of the "ingredients" key be an array of an object inputted
	// by yourself, you can instantiate your ingredientModel as follows:
		// ingredients : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
	// and hence you get all the properties of each ingredient in the list
var Order = new Schema({
	_id: {type: String},
	ingredients: [{quantity: Number, name: String}],
	complete: Boolean,
	cost: Number
}, {collection: 'Order'});

module.exports = mongoose.model('Order', Order);