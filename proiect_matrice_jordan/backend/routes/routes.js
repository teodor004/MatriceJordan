const express = require('express');
const router = express.Router();
const db = require('../database/database'); // Ensure the correct path to your db connection file

// Create a new user
router.post('/create', async (req, res) => {
    const { name, age, scop, height, weight } = req.body;

    if (!name || !age || !scop || !height || !weight) {
        return res.status(400).json({ error: 'Missing data' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO person (name, age, scop, height, weight) VALUES (?, ?, ?, ?, ?)',
            [name, age, scop, height, weight]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            age,
            scop,
            height,
            weight
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM person');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM person WHERE id = ?', [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update user data
router.put('/:id', async (req, res) => {
    const { name, age, scop, height, weight } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE person SET name = ?, age = ?, scop = ?, height = ?, weight = ? WHERE id = ?',
            [name, age, scop, height, weight, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ id: req.params.id, name, age, scop, height, weight });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM person WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
