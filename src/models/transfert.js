/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
import Agent from './agent.js';

const transfertSchema = new mongoose.Schema({
    amountOfMoneyInEuro: {
        type: Number,
        required: [true, 'Veuillez Fournir un montant'],
    },
    city: {
        type: String,
        enum: {
            values: ['CONAKRY', 'KINDIA', 'BOKE', 'COLLAB'],
            message: '{VALUE} is not supported',
        },
        required: true,
    },
    moneyTypes: {
        type: String,
        required: true,
        enum: {
            values: ['LIQUIDE', 'ORANGE MONEY'],
            message: '{VALUE} is not supported',
        },
    },
    clientName: {
        type: String,
        required: [true, 'Veuillez fournir un nom client'],
        minlength: 4,
    },
    phoneNumber: {
        type: String,
        maxlength: 9,
    },
    senderName: {
        type: String,
        required: true,
    },
    hasTakeMoney: {
        type: Boolean,
        default: false,
    },
    hasFullyPaid: {
        type: Boolean,
        default: true,
    },
    leftAmountToPay: {
        type: Number,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    updatedDate: {
        type: Date,
        default: new Date(),
    },
    fees: {
        type: Number,
    },
    hasBeenModified: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String,
    },

    contactNumber: {
        type: String,
        minlength: 9,
        maxlength: 9,
    },
    payoutDay: {
        type: Date,
    },
    rate: {
        type: Number,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Agent',
        required: [true, 'Veuillez fournir un agent'],
    },
    amountGiven: {
        type: Number,
    },
});

transfertSchema.pre('save', async function () {
    if (this.amountOfMoneyInEuro > 20 && this.amountOfMoneyInEuro <= 50)
        return (this.fees = 2);
    if (this.amountOfMoneyInEuro > 50 && this.amountOfMoneyInEuro < 100)
        return (this.fees = 3);
    if (this.amountOfMoneyInEuro >= 100 && this.amountOfMoneyInEuro < 1000) {
        if (
            Number.isInteger((this.fees = (4 * this.amountOfMoneyInEuro) / 100))
        )
            return (this.fees = 4 * (this.amountOfMoneyInEuro / 100));
        return (this.fees = Math.floor(this.fees));
    }
    if (this.amountOfMoneyInEuro >= 1000) {
        if (
            Number.isInteger((this.fees = (3 * this.amountOfMoneyInEuro) / 100))
        )
            return (this.fees = 3 * (this.amountOfMoneyInEuro / 100));
        return (this.fees = Math.floor(this.fees));
    }
});

transfertSchema.pre('save', async function () {
    const agent = await Agent.findById(this.createdBy);
    const { senderCode, transfertCounts, _id } = agent;
    this.code = `${senderCode}${transfertCounts}`;

    agent.transfertCounts = transfertCounts + 1;
    await agent.save();
});

export default mongoose.model('Transfert', transfertSchema);
