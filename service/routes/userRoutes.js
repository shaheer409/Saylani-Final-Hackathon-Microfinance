const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Loan = require('../models/Loan');
const QRCode = require('qrcode');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { cnic, email, name, password, isAdmin } = req.body;
    const newUser = new User({ cnic, email, name, password, isAdmin });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send user data and token
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,  // Send userId
      isAdmin: user.isAdmin  // Send isAdmin
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Submit Loan Request
router.post('/loan', async (req, res) => {
  try {
    const { userId, category, subcategory, amount } = req.body;
    const loan = new Loan({ userId, category, subcategory, amount });
    await loan.save();
    res.status(201).json({ message: 'Loan request submitted', loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add Guarantor Information
router.post('/guarantor', async (req, res) => {
  try {
    const { userId, guarantors } = req.body;
    const user = await User.findByIdAndUpdate(userId, { guarantors }, { new: true });
    res.status(200).json({ message: 'Guarantor information added', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch Loan Details
router.get('/loan-details/:userId', async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId });
    res.status(200).json(loans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Generate Slip with QR Code
router.get('/slip/:loanId', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId).populate('userId');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const appointmentDetails = {
      date: new Date().toLocaleDateString(),
      time: '10:00 AM',
      location: 'Office HQ',
    };

    const qrData = JSON.stringify({ loanId: loan._id, appointmentDetails });
    const qrCode = await QRCode.toDataURL(qrData);

    loan.appointmentDetails = { ...appointmentDetails };
    loan.qrCode = qrCode;
    await loan.save();

    res.status(200).json({ message: 'Slip generated', appointmentDetails, qrCode });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
