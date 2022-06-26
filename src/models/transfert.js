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
    },
    senderName: {
        type: String,
        required: true,
    },
    hasTakeMoney: {
        type: Boolean,
        default: false,
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
    hasReceiveMoney: {
        type: Boolean,
        default: false,
    },
    contactNumber: {
        type: String,
        minlength: 9,
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

// transfertSchema.pre('save', async function () {
//     const agent = await Agent.findOne({ senderName: this.senderName });
//     const { senderCode, transfertCounts, id } = agent;
//     this.code = `${senderCode}${transfertCounts}`;

//     await Agent.updateOne(
//         { _id: id },
//         { transfertCounts: transfertCounts + 1 },
//         {
//             new: true,
//             runValidators: true,
//         }
//     );
// });

export default mongoose.model('Transfert', transfertSchema);
