const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const mssql = require('./mssql');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended : true,
    })
);

app.get('/', (req, res) => {
    res.json({info : "Nice lur"})
});

app.get('/hakim', mssql.getHakim);

app.get('/test', db.getTest);
app.post('/create-test', db.createTest);
app.put('/update-test/:id', db.updateTest);

app.listen(port , () => {
    console.log(`App running on port ${port}`)
});

