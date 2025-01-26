const express = require('express');
const Loan = require('../models/Loan');

const router = express.Router();

// View All Applications
router.get('/applications', async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId');
    res.status(200).json(loans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Application Status
router.put('/application/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({ message: 'Application status updated', loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Token Numbers
router.post('/token', async (req, res) => {
  try {
    const { loanId, tokenNumber } = req.body;
    const loan = await Loan.findByIdAndUpdate(loanId, { tokenNumber }, { new: true });
    res.status(200).json({ message: 'Token number added', loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Filter Applications by City/Country
router.get('/filter', async (req, res) => {
  try {
    const { city, country } = req.query;
    const loans = await Loan.find({ 'userId.personalInfo.city': city, 'userId.personalInfo.country': country }).populate('userId');
    res.status(200).json(loans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
