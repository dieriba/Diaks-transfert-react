const mongoose = require('mongoose');
const User = require('./user');

const moneyTakerSchema = new mongoose.Schema({
	name : {
		type: String,
		required : true
	},
	amountMoney : {
		type : Number,
		required : true
	},
	phoneNumber : {
		type : String,
		required : true
	},
	hasTakeMoney : {
		type : Boolean,
		default : false
	},
	optionalInfo : {
		type : String
	},
	date : {
		type : Date,
		default : new Date()
	},
	code : {
		type : String,
	},username : {
		type : String,
		default : 'abdoulay',
	}
});

moneyTakerSchema.pre('save', async function () {
	const user = await User.findOne({ username: this.username });
	const { transfertCounts , id } = user;
	this.code = `AB${transfertCounts}`;

	await User.updateOne({ _id: id }, {transfertCounts : transfertCounts + 1}, {
		new: true,
		runValidators: true,
	});
	
});


module.exports = mongoose.model('MoneyTaker', moneyTakerSchema);
