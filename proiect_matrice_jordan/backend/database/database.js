const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',       // The MySQL host (typically 'localhost')
    user: 'root',   // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'gym',     // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();  // Exporting the promise-based API for convenience
