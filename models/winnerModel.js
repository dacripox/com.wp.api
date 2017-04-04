var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var winnerSchema = new Schema({
	'promoId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'promotion',
	 	required: true
	},
	'userId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user',
	 	required: true
	},
	'createdDate':{ 
		type: Date,
	 	default: Date.now 
	},
	'points' : Number,
	'displayName' : String,
	'profileImg' : String,
	'contact' : String
});

module.exports = mongoose.model('winner', winnerSchema);
