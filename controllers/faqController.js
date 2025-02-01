const Faq = require('../models/Faq');
const Redis = require('ioredis');
const translate = require('google-translate-api-x');  // Free Google Translate API

const redis = new Redis();

// Fetch all FAQs with language support & caching
exports.getFaqs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';  // Default to English
        let cachedData = await redis.get(`faqs_${lang}`);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        let faqs = await Faq.find();

        if (lang !== 'en') {
            faqs = await Promise.all(faqs.map(async faq => {
                let translatedText = faq.translations[lang];
                if (!translatedText) {
                    const translation = await translate(faq.question, { to: lang });
                    translatedText = translation.text;
                    faq.translations[lang] = translatedText;
                    await faq.save();
                }
                return { ...faq._doc, question: translatedText };
            }));
        }

        // Cache the FAQs for 1 hour
        await redis.setex(`faqs_${lang}`, 3600, JSON.stringify(faqs));
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a specific FAQ by ID
exports.getFaqById = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new FAQ with automatic translation & caching
exports.addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const translations = {};

        const supportedLangs = ['hi', 'bn'];  // Example: Hindi & Bengali
        for (const lang of supportedLangs) {
            const translation = await translate(question, { to: lang });
            translations[lang] = translation.text;
        }

        const newFaq = new Faq({ question, answer, translations });
        await newFaq.save();

        // Clear cache after adding a new FAQ
        redis.del('faqs_en');
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing FAQ
exports.updateFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = await Faq.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });

        // Clear cache after updating an FAQ
        redis.del('faqs_en');
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an FAQ by ID
exports.deleteFaq = async (req, res) => {
    try {
        await Faq.findByIdAndDelete(req.params.id);

        // Clear cache after deleting an FAQ
        redis.del('faqs_en');
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
