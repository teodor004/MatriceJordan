const express = require('express');
const router = express.Router();
const db = require('../db'); // importă conexiunea la baza de date

// Ruta POST pentru a salva datele
router.post('/save', (req, res) => {
    const { age, weight, height, scop } = req.body;

    // Validare date
    if (!age || !weight || !height || !scop) {
        return res.status(400).send('Toate câmpurile sunt necesare!');
    }

    // Înregistrare date în baza de date (asigură-te că ai configurat conexiunea)
    const query = `INSERT INTO person (age, weight, height, scop) VALUES (?, ?, ?, ?)`;
    db.query(query, [age, weight, height, scop], (err, result) => {
        if (err) {
            console.error('Eroare la salvarea datelor:', err);
            return res.status(500).send('Eroare la salvarea datelor.');
        }
        res.status(200).send('Datele au fost salvate cu succes!');
    });
});

module.exports = router;
