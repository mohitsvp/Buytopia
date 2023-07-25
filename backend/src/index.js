// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const connect = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB


// Routes
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

// Start the server
app.listen(PORT, () => {
    try {
        connect()
        console.log(`Server started on port ${PORT}`);
    } catch (error) {
        
    }
});
