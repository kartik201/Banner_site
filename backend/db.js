const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bannerDatabase',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/banner', (req, res) => {
    db.query('SELECT * FROM bannerSettings WHERE id = 1', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result[0]);
    });
});

app.post('/banner', (req, res) => {
    const { description, timer, link } = req.body;
    db.query(
        'UPDATE bannerSettings SET description = ?, timer = ?, link = ? WHERE id = 1',
        [description, timer, link],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Banner updated successfully');
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
