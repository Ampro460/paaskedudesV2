const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your MySQL database credentials
const db = mysql.createConnection({
    host: 'localhost',
    user: 'paaskedu_movieList',
    password: 'Abcd-1234',
    database: 'paaskedu_movieList',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

app.get('/get-ranking', (req, res) => {
    const sql = 'SELECT * FROM movie_ranking ORDER BY position';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/save-ranking', (req, res) => {
    const movies = req.body;
    const sql = 'UPDATE movie_ranking SET position = ? WHERE movie_id = ?';

    movies.forEach((movie, index) => {
        db.query(sql, [index, movie], (err, result) => {
            if (err) throw err;
        });
    });

    res.send({ status: 'success' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
