const mongoose = require('mongoose');


const DB_URI = process.env.DB_URI

const connect = async () => {
    await mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('MongoDB connection error:', err));    
}


module.exports = connect