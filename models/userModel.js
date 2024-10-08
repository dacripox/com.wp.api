var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
	'userId' : {
		type:String,
		index: true,
	 	required: true,
	 	unique: true 
	 },
	'createdDate' : {
		type:Date,
	 	default: Date.now
	 },
	'firstName' : String,
	'lastName' : String,
	'sex' : String,
	'age' : Number,
	'email' : String,
	'phone' : String,
	'password' : String,
	'onesignalId' : String,
	'googleId' : String,
	'facebookId' : String,
	'profileImg' : String,
	'lng' : String,
	'lat' : String,
	'postCode' : String,
	'interests' : Array,
	'points' : Number,
	'hasPushEnabled' : Boolean,
	'hasGeolocEnabled' : Boolean,
	'hasProfileCompleted' : Boolean,
	'trollNumber':{
		type: Number,
	 	default :  0
	},
	'schemaVer' : {
		type: Number,
	 	default :  1
	}
});


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
