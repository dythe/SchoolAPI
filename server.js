const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;

require ('./routes') (app, {});

app.get('/', function (req, res) {
    res.send('This is the landing page');
 })
 
 var server = app.listen(port, function () {
    console.log("Server running on port %s", port)
 })