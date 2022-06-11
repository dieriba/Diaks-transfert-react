/* eslint-disable linebreak-style */
const mongoose = require('mongoose');


const agentSchema = new mongoose.Schema({
	senderName : {
		type: String,
		required : true,
		unique : true
	},
	phoneNumber : {
		type : String,
		minlength : 10,
		maxlength : 14
	},
	totalMoneyTransfered : {
		type : Number
	},
	senderCode : {
		type : String,
		unique : true,
		required : true
	}
	,transfertCounts : {
		type : Number,
		default : 0
	}
});




module.exports = mongoose.model('Agent', agentSchema);
