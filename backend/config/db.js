const mongoose = require('mongoose');

const connectDB = async (option) => {
    const mongodbURL = process.env.MONGO_URI;

    try {
        await mongoose.connect(mongodbURL, option);
        console.log('MongoDB Atlas connected successfully');

        mongoose.connection.on('error', (error) => {
            console.error('DB Connection error:', error);
        });
    } catch (error) {
        console.error('Could not connect to DB:', error.toString());
    }
};

module.exports = connectDB;