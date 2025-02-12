const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    },
},{timestamps: true});


const User = mongoose.model('User',userSchema);

module.exports = User;