/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
	rate: {
		type: Number,
	},
	startDate: {
		type: Date,
		default: new Date(),
	},
	endDate: {
		type: Date,
	},
});

module.exports = mongoose.model('Rate', rateSchema);
