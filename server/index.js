require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(require('./routes'))

app.listen(PORT,function () {
    console.log("Running process " + process.pid + " on port " + PORT);
})