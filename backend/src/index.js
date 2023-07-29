// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const connect = require('./config/db');
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/auth.js")
const productRoutes = require("./routes/product.js");
const categoryRoutes = require("./routes/categories.js");
const brandRoutes = require("./routes/brand.js");

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brand", brandRoutes);

// Start the server
app.listen(PORT, () => {
    try {
        connect()
        console.log(`Server started on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
});
