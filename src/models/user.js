/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    role: {
        type: String,
        required: [true, 'Définir un rôle'],
    },
    isBanned: {
        type: Boolean,
		default : false
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

userSchema.methods.createJWT = function (payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFETIME,
    });
};
export default mongoose.model('User', userSchema);
