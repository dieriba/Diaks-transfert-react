/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "veuillez fournir un nom d'utilisateur"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Veuillez fournir un mot de passe'],
        minlength: 8,
    },
    role: {
        type: String,
        value: ['highAdmin', 'admin', 'mediumAdmin', 'agent', 'moneyGiver'],
        required: [true, 'Définir un rôle'],
    },
    isBanned: {
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
    },
    LinkedToAgentId: {
        type: mongoose.Types.ObjectId,
        rfe: 'Agent',
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
