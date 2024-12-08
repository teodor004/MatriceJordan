// goalRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // importă conexiunea la baza de date

// Move this out of the POST route
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

// Your POST route here for '/save'
router.post('/save', (req, res) => {
    const { age, weight, height, scop, vegetarian } = req.body;

    // Validare date
    if (!age || !weight || !height || !scop) {
        return res.status(400).json({ message: 'Toate câmpurile sunt necesare!' });
    }

    const scopId = parseInt(scop, 10);
    if (isNaN(scopId)) {
        return res.status(400).json({ message: 'ID-ul scopului este invalid!' });
    }

    const isVegetarian = vegetarian === 'true' || vegetarian === true ? 1 : 0;

    const query = `INSERT INTO person (age, weight, height, scop, vegetarian) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [age, weight, height, scopId, isVegetarian], (err, result) => {
        if (err) {
            console.error('Eroare la salvarea datelor:', err);
            return res.status(500).json({ message: 'Eroare la salvarea datelor.' });
        }
        res.status(200).json({ message: 'Datele au fost salvate cu succes!' });
    });
});

module.exports = router;
