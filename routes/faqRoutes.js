const express = require('express');
const { getFaqs, getFaqById, addFaq, updateFaq, deleteFaq } = require('../controllers/faqController');

const router = express.Router();

// Fetch all FAQs
router.get('/', getFaqs);

// Fetch a specific FAQ by ID
router.get('/:id', getFaqById);

// Add a new FAQ
router.post('/', addFaq);

// Update an FAQ by ID
router.put('/:id', updateFaq);

// Delete an FAQ by ID
router.delete('/:id', deleteFaq);

module.exports = router;