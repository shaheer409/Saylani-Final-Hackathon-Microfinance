// backend/controllers/adminController.js

const LoanRequest = require('../models/LoanRequest');

// View all loan requests
const getAllLoanRequests = async (req, res) => {
    const { city, country } = req.query;

    try {
        const filter = {};

        if (city) filter.city = city;
        if (country) filter.country = country;

        const loanRequests = await LoanRequest.find(filter);
        res.json(loanRequests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching loan requests' });
    }
};

module.exports = { getAllLoanRequests };
