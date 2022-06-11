/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	isHighAdmin: {
		type: Boolean,
		default: false,
	},
	isMediumAdmin: {
		type: Boolean,
		default: false,
	},
	isAgent: {
		type: Boolean,
		default: false,
	},
	isMoneyGiver: {
		type: Boolean,
		default: false,
	},
	senderName: {
		type: String,
	},
	transfertCounts: {
		type: Number,
		default: 0,
	},
	senderCode: {
		type: String,
		unique: true,
	},
});

userSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function (postedPassword) {
	const isSamePassword = await bcrypt.compare(postedPassword, this.password);
	return isSamePassword;
};

module.exports = mongoose.model('User', userSchema);
