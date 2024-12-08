const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection
const goalsRoutes = require('./routes/goalRoutes'); // Goal routes

const app = express();
const port = 5000;

// Allow CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON request body
app.use(bodyParser.json()); // Using bodyParser to process JSON requests

// Use goal routes for '/api/goals' endpoint
app.use('/api/goals', goalsRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
app.listen(port, () => {
    console.log("Server is running on http://localhost:5000");
});
