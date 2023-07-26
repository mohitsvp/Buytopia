// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const connect = require('./config/db');
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/auth.js")

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB


// Routes
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/auth", userRoutes);

// Start the server
app.listen(PORT, () => {
    try {
        connect()
        console.log(`Server started on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
});
