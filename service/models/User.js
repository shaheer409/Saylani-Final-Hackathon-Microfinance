const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // For admin login
  guarantors: [
    {
      name: String,
      email: String,
      location: String,
      cnic: String,
    },
  ],
  personalInfo: {
    address: String,
    phoneNumber: String,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
