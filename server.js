require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const faqRoutes = require('./routes/faqRoutes');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const Faq=require('./models/Faq');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/faqs', faqRoutes);
AdminBro.registerAdapter(AdminBroMongoose);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',  // Admin panel accessible at /admin
    branding: {
        companyName: 'Bharat FD',
        softwareBrothers: false,
    }
});


// Create an Express router for AdminBro
const adminRouter = AdminBroExpress.buildRouter(adminBro);

// Use the adminRouter for the /admin route
app.use(adminBro.options.rootPath, adminRouter);

