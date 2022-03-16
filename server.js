const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
const upload = multer({dest: './upload'})

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/history', (req, res) => {
    connection.query(
        'SELECT * FROM HISTORY WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload'));

app.post('/api/history', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO HISTORY VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    // let image = '/image/' + req.file.filename;
    let uid = req.body.uid;
    let component = req.body.component;
    let language = req.body.language;
    let as_is = req.body.as_is;
    let to_be = req.body.to_be;
    let params = [uid, component, language, as_is, to_be];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.delete('/api/history/:id', (req, res) => {
    let sql = 'UPDATE HISTORY SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});


app.listen(port, () => console.log(`Listening on port ${port}`));