const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Conexiune la baza de date
const db = mysql.createConnection({
  host: 'localhost',
  user: 'route', // Username-ul default MySQL
  password: 'password', // Lasă gol dacă nu ai setat o parolă pentru MySQL
  database: 'gym_app', // Asigură-te că ai creat baza de date înainte
});

// Verificare conexiune la baza de date
db.connect((err) => {
  if (err) {
    console.error('Eroare la conectarea la baza de date:', err);
    process.exit(1); // Oprește serverul dacă baza de date nu funcționează
  } else {
    console.log('Conectat la baza de date MySQL.');
  }
});

// Ruta GET pentru obținerea tuturor workout-urilor
app.get('/api/workouts', (req, res) => {
  const query = 'SELECT * FROM workouts'; // Asigură-te că tabela workouts există
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Nu am reușit să preluăm workout-urile.' });
    } else {
      res.json(results);
    }
  });
});

// Ruta POST pentru adăugarea unui workout
app.post('/api/workouts', (req, res) => {
  const { name, category, level, duration, description, media_url } = req.body;
  const query = `
    INSERT INTO workouts (name, category, level, duration, description, media_url) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, category, level, duration, description, media_url], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Nu am reușit să adăugăm workout-ul.' });
    } else {
      res.status(201).json
