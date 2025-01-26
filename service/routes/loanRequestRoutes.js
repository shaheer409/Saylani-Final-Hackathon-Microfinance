// backend/routes/loanRequestRoutes.js

const express = require('express');
const router = express.Router();
const { createLoanRequest, generateTokenAndAppointment } = require('../controllers/loanRequestController');

// Create loan request
router.post('/', createLoanRequest);

// Generate token and appointment
router.post('/generate-token', generateTokenAndAppointment);

module.exports = router;
