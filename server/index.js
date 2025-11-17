require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(require('./routes'))

app.listen(PORT,function () {
    console.log("Running process " + process.pid + " on port " + PORT);
})