import mongoose from 'mongoose';
import User from './user.js';

const moneyTakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amountMoney: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    hasTakeMoney: {
        type: Boolean,
        default: false,
    },
    optionalInfo: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    payoutDay : {
        type : Boolean,
        default : false
    },
    code: {
        type: String,
    },
    username: {
        type: String,
        default: 'abdoulay',
    },
});

moneyTakerSchema.pre('save', async function () {
    const user = await User.findOne({ role : 'mediumAdmin' });
    const { transfertCounts, id } = user;
    this.code = `AB${transfertCounts}`;

    await User.updateOne(
        { _id: id },
        { transfertCounts: transfertCounts + 1 },
        {
            new: true,
            runValidators: true,
        }
    );
});

export default mongoose.model('MoneyTaker', moneyTakerSchema);
