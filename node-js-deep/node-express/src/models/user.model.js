const mongoose = require("mongoose");

// Schema 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    require: false,
    default: 'Unknown'
  },
  ipAddress: {
    type: String,
    required: false,
    default: 'Unknown'
  }
  
},{timestamps: true})

const User = mongoose.model('User',userSchema);

module.exports = User;