const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const routes = require('./routes');
const app = express();

// Configure CORS correctly
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware for parsing JSON bodies
app.use(express.json());

// Database connection functions
const { connectDb, checkconnected } = require('./db');
connectDb();

// Routes
app.use('/api', routes);

// Test route
app.get('/test', (req, res) => {
    res.send('Server running!');
});

// Database connection status
app.get('/', (req, res) => {
    if (checkconnected()) {
        res.send('Database connection status: Connected');
    } else {
        res.send('Database connection status: Connection failed');
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

