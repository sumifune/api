const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Venue = new Schema ({
	venuename: {
		type: String,
		trim: true,
	},
	firstname: {
		type: String,
		trim: true,
	},
	lastname: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
	},
	country: {
		type: String,
		trim: true,
	},
	city: {
		type: String,
		trim: true,
	}
});

module.exports = mongoose.model('Venue', Venue);