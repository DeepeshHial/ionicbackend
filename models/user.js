const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  selectedOption: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  bio: { type: String },
  rangeValue: { type: Number },
  file: { type: String }, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
