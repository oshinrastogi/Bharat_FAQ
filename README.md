🚀 Bharat_FD - FAQ Management System
A multilingual FAQ management system built using Node.js, Express.js, MongoDB, and Redis, with Google Translate API for automatic translations and Admin Panel for managing FAQs.

🌟 Features
✅ REST API for FAQs – Supports fetching, adding, updating, and deleting FAQs
✅ Multilingual Support – Translations via Google Translate API
✅ Redis Caching – Improves performance by caching translated responses
✅ Admin Panel – Manage FAQs using a user-friendly AdminBro dashboard
✅ Pagination & Filtering – Efficient API performance with paginated results

🛠️ Tech Stack
Backend: Node.js, Express.js, MongoDB, Mongoose
Database: MongoDB (Local)
Caching: Redis
Admin Panel: AdminBro
Translation API: Google Translate API

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/oshinrastogi/Bharat_FAQ.git
cd Bharat_FAQ

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables
Create a .env file in the root directory and add the following:
PORT=8000
MONGO_URI=mongodb://localhost:27017/bharat_fd_db
GOOGLE_TRANSLATE_KEY=your_google_api_key_here
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

4️⃣ Start MongoDB & Redis (If Running Locally)
Make sure MongoDB and Redis are running before starting the server.
# Start MongoDB
mongod --dbpath /data/db

# Start Redis
redis-server

5️⃣ Start the Server
npm start

📌 API Endpoints
1️⃣ Fetch All FAQs (Supports Translations)
GET http://localhost:8000/api/faqs
GET http://localhost:8000/api/faqs?lang=hi  # Hindi
GET http://localhost:8000/api/faqs?lang=bn  # Bengali

✅ Response Example:
[
      {
        "_id": "650b2bdf5d8f",
        "question": "What is Node.js?",
        "answer": "Node.js is a JavaScript runtime.",
        "translations": {
            "hi": "Node.js क्या है?",
            "bn": "Node.js কি?"
        }
    }
]

2️⃣ Fetch a Specific FAQ by ID
GET http://localhost:8000/api/faqs/:id

3️⃣ Add a New FAQ
POST http://localhost:8000/api/faqs
Content-Type: application/json

✅ Request Body:
{
    "question": "What is Express.js?",
    "answer": "Express.js is a web application framework for Node.js."
}

✅ Response:
{
    "_id": "650b3c5d1a2f",
    "question": "What is Express.js?",
    "answer": "Express.js is a web application framework for Node.js.",
    "translations": {
        "hi": "Express.js क्या है?",
        "bn": "Express.js কি?"
    }
}

4️⃣ Update an FAQ
PUT http://localhost:8000/api/faqs/:id
Content-Type: application/json

✅ Request Body:
{
    "question": "What is Express.js?",
    "answer": "Express.js is a powerful web framework for Node.js."
}

5️⃣ Delete an FAQ
DELETE http://localhost:8000/api/faqs/:id

🎛️ Admin Panel (For Managing FAQs)
The Admin Panel allows easy management of FAQs.
Access it at:
🔗 http://localhost:8000/admin

🔍 Project Structure
Bharat_FAQ/
├── client/                 
├── controllers/
│   └── faqController.js
├── models/
│   └── Faq.js
├── routes/
│   └── faqRoutes.js
├── test/
│   └── faq.test.js
├── .env
├── server.js
├── package.json
├── README.md

🔥 Contributing
Contributions are welcome! 🎉

To contribute:

Fork the repository
Create a new branch (git checkout -b feature-name)
Commit changes (git commit -m "Add new feature")
Push to GitHub (git push origin feature-name)
Create a Pull Request (PR)
