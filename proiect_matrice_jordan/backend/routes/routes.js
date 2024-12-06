const express = require('express');
const router = express.Router();

// Dummy data - Replace with database calls later
let users = [];

// Create a new user
router.post('/create', (req, res) => {
    const { name, age, goals } = req.body;

    if (!name || !age || !goals) {
        return res.status(400).json({ error: 'Missing data' });
    }

    const newUser = { id: users.length + 1, name, age, goals };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get a specific user
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Update user data
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { name, age, goals } = req.body;
    user.name = name || user.name;
    user.age = age || user.age;
    user.goals = goals || user.goals;

    res.json(user);
});

// Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

module.exports = router;
