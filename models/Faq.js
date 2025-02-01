const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }, // Stores HTML content (WYSIWYG)
    translations: { 
        hi: { type: String },  // Hindi translation
        bn: { type: String }   // Bengali translation
    }
}, { timestamps: true });

module.exports = mongoose.model('Faq', FaqSchema);
