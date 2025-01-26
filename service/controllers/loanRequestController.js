// backend/controllers/loanRequestController.js

const LoanRequest = require('../models/LoanRequest');
const Appointment = require('../models/Appointment');

// Create loan request
const createLoanRequest = async (req, res) => {
    const { userId, category, subcategory, deposit, loanPeriod, guarantors, statement, salarySheet, address, phoneNumber } = req.body;

    try {
        const loanRequest = new LoanRequest({
            userId,
            category,
            subcategory,
            deposit,
            loanPeriod,
            guarantors,
            statement,
            salarySheet,
            address,
            phoneNumber,
        });

        await loanRequest.save();

        res.status(201).json(loanRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error creating loan request' });
    }
};

// Generate token number and appointment
const generateTokenAndAppointment = async (req, res) => {
    const { loanRequestId, tokenNumber, appointment } = req.body;

    try {
        const loanRequest = await LoanRequest.findById(loanRequestId);

        if (!loanRequest) {
            return res.status(404).json({ message: 'Loan request not found' });
        }

        loanRequest.tokenNumber = tokenNumber;
        loanRequest.appointment = appointment;

        await loanRequest.save();

        const newAppointment = new Appointment({
            loanRequestId,
            tokenNumber,
            date: appointment.date,
            time: appointment.time,
            location: appointment.location,
        });

        await newAppointment.save();

        res.status(200).json({ message: 'Token and appointment generated' });
    } catch (err) {
        res.status(500).json({ message: 'Error generating token and appointment' });
    }
};

module.exports = { createLoanRequest, generateTokenAndAppointment };
