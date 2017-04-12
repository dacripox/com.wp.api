var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var promotionSchema = new Schema({
	'promoId': {
		type: String,
		index: true,
		required: true,
		unique: true
	},
	'promoType': {
		type: Number,
		required: true
	},
	'promoEnabled': {
		type: Boolean,
		default: true
	},
	'promoEnded': {
		type: Boolean,
		default: false
	},
	'createdDate': {
		type: Date,
		default: Date.now
	},
	'startDate': {
		type: Date,
		required: true,
	},
	'endDate': {
		type: Date,
		required: true,
	},
	'promoTitle': {
		type: String,
		required: true,
	},
	'promoDescription': {
		type: String,
		required: true,
	},
	'promoLegalCond': {
		type: String,
		required: true,
	},
	'promoContactDetails': {
		type: String,
		required: true,
	},
	'promoImage': {
		type: String,
		required: true,
	},
	'socialImage': {
		type: String,
		required: true,
	},
	'participNumber': {
		type: Number,
		default: 0
	},
	'totalPoints': {
		type: Number,
		default: 0
	},
	'shareMessages': Array,
	'winnersNumber': {
		type: Number,
		required: true,
	},
	'priceItemAvg': String,
	'showLocalization': {
		type: Boolean,
		required: true,
	},
	'lat': String,
	'lng': String,
	'postalCode': String,
	'fullAddress': String,
	'companyId': {
		type: Schema.Types.ObjectId,
		ref: 'company'
	},
	'trollNumber': {
		type: Number,
		default: 0
	},
	'facebookTrackingPixel': String,
	'googleTrackingPixel': String,
	'schemaVer': {
		type: Number,
		default: 1
	}
});

promotionSchema.plugin(uniqueValidator);
module.exports = mongoose.model('promotion', promotionSchema);
