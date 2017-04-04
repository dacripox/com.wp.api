var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var participationSchema = new Schema({
	'createdDate' :{ 
		type: Date,
	 	default: Date.now 
	},
	'promotion' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'promotion',
	 	required: true
	},
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user',
	 	required: true
	},
	'promoId' : {
	 	type: String,
	 	required: true
	},
	'userId' : {
	 	type: String,
	 	required: true
	},
	'refFriend' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'friendParticNumber' : {
		type:Number,
	 	required: true
	 },
	'friendVisualNumber'  : {
		type:Number,
	 	required: true
	 },
	'points'  : {
		type:Number,
	 	required: true
	 },
	'ip' : String,
	'pushEnabled'  : {
		type:Boolean,
	 	default: false 
	 },
	'schemaVer' : {
		type: Number,
	 	default :  1
	}
});

participationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participation', participationSchema);
