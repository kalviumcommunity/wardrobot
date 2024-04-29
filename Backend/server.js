const express = require('express');
const dotenv = require('dotenv').config(); 
const mongoose = require('mongoose');
const routes = require('./routes'); 

const app = express();
app.use('/api', routes);

const { connectDb,checkconnected } = require('./db');
connectDb();

app.get('/test', (req, res) => {
    res.send('Server running!');
});

app.get('/', (req, res) => {
    if (checkconnected()) {
        res.send('Database connection status: Connected');
    } else {
        res.send('Database connection status: Connection failed');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});
