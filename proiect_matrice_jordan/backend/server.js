const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Conexiunea la baza de date, o vei crea mai târziu
const goalsRoutes = require('./routes/goalRoutes'); // Rutele pentru gestionarea 'goals'
//const cors = require('cors');



const app = express();
const port = 5000;

// Permite cererile CORS
app.use(cors());

// Middleware pentru a procesa cererile în format JSON
app.use(bodyParser.json());

// Rute pentru 'goals'
app.use('/api/goals', goalsRoutes); // Rutele pentru 'goals'

// Ruta de bază pentru testare
app.get('/', (req, res) => {
    res.send('Serverul rulează');
});

// Pornim serverul
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
