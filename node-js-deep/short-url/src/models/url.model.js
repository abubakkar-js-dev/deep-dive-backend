const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shorId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{timestamps: {type: Number}}]
},{timestamps: true})


const URL = mongoose.model('Url',urlSchema);

module.exports = URL;