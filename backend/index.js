const express = require('express');
const app = express();
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Server running successfully at http://localhost:${port}`);
    await connectDB();
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Combine route paths
app.use('/api/users', userRoute);
app.use('/api/users', authRoute);

// Client error handling
app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});

// Server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});