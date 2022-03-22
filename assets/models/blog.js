const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Trade = mongoose.model('Blog', tradeSchema); //looks for "Blogs" collection in senate-trades
module.exports = Trade;