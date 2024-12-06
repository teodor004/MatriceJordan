const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// User Routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Gym App Backend');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
