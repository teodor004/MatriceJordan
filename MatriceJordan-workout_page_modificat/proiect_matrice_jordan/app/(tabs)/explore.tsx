// goalRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Correct the logic here by separating the routes
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT vegetarian FROM person WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(results[0]); // Send back the vegetarian status
        }
    });
});

// POST route for saving data
router.post('/save', (req, res) => {
    const { age, weight, height, scop, vegetarian } = req.body;

    // Validate data
    if (!age || !weight || !height || !scop) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const scopId = parseInt(scop, 10);
    if (isNaN(scopId)) {
        return res.status(400).json({ message: 'Invalid scop ID!' });
    }

    const isVegetarian = vegetarian === 'true' || vegetarian === true ? 1 : 0;

    const query = `INSERT INTO person (age, weight, height, scop, vegetarian) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [age, weight, height, scopId, isVegetarian], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ message: 'Error saving data.' });
        }
        res.status(200).json({ message: 'Data saved successfully!' });
    });
});

module.exports = router;
