const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userId: String,
    date: { type: Date, default: Date.now },
    secondsElapsed: Number,
    notes: {
        text: String,
    },
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
