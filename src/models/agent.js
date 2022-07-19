/* eslint-disable linebreak-style */
import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
    },
    totalMoneyTransfered: {
        type: Number,
    },
    senderCode: {
        type: String,
        unique: true,
        required: true,
    },
    transfertCounts: {
        type: Number,
        default: 0,
    },
    LinkedToUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model('Agent', agentSchema);
