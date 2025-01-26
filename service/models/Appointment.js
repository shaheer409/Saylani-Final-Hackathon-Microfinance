// backend/models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    loanRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanRequest', required: true },
    tokenNumber: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
