/* eslint-disable linebreak-style */
import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    rate: {
        type: Number,
    },
    inUse: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
});

export default mongoose.model('Rate', rateSchema);
