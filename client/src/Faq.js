import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const [lang, setLang] = useState('en'); // Default to English

    // Fetch FAQs from API based on the selected language
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/faqs?lang=${lang}`);
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        fetchFaqs();
    }, [lang]);

    return (
        <div>
            <h1>Frequently Asked Questions</h1>

            {/* Language selector */}
            <div>
                <label>Select Language: </label>
                <select onChange={(e) => setLang(e.target.value)} value={lang}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                </select>
            </div>

            {/* Display FAQs */}
            <div>
                {faqs.length > 0 ? (
                    <ul>
                        {faqs.map((faq) => (
                            <li key={faq._id}>
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                                {/* Display translation if available */}
                                {faq.translations && faq.translations[lang] && (
                                    <div>
                                        <strong>Translation:</strong> {faq.translations[lang]}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No FAQs available.</p>
                )}
            </div>
        </div>
    );
};

export default Faq;
