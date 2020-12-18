const express = require('express');
const app = express();
const port = 4300;

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('app/data/sqlitedb');
var bodyParser = require("body-parser");
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



require('./app/routes')(app, db);

app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});

