const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const app = express();
const userRoutes = require('./userRoutes')


app.use(cors());
app.use(express.json());
app.use(express.static('public'))
const { connectDb, checkconnected } = require('./db');
connectDb();


app.use('/api', routes);
app.use('/users', userRoutes);

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

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

