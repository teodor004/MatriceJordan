const mysql = require('mysql2'); // Folosim mysql2 în loc de mysql


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Modifică cu utilizatorul corect
    password: 'LionelMessieTeo1',  // Modifică cu parola corectă
    database: 'polihack',  // Modifică cu numele bazei tale de date
});

db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
    } else {
        console.log('Conectat la baza de date');
    }
});

module.exports = db;
