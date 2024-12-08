const express = require('express');
const router = express.Router();
const db = require('../db'); // importă conexiunea la baza de date

router.post('/save', (req, res) => {
    const { age, weight, height, scop, vegetarian } = req.body;

    // Validare date
    if (!age || !weight || !height || !scop) {
        return res.status(400).json({ message: 'Toate câmpurile sunt necesare!' });
    }

    // Verifică dacă scop este un ID valid
    const scopId = parseInt(scop, 10);
    if (isNaN(scopId)) {
        return res.status(400).json({ message: 'ID-ul scopului este invalid!' });
    }

    // Convertește vegetarian în 1 (da) sau 0 (nu)
    const isVegetarian = vegetarian === 'true' || vegetarian === true ? 1 : 0;

    // Inserare în baza de date
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
