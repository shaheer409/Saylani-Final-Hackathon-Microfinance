const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  appointmentDetails: {
    date: String,
    time: String,
    location: String,
  },
  tokenNumber: { type: String },
  qrCode: { type: String }, // Base64 encoded QR code
});

module.exports = mongoose.model('Loan', loanSchema);
