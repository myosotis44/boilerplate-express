var express = require('express');
var app = express();

console.log('Hello World');

// Start a Working Express Server

/*

app.get('/', (req, res) => {
    res.send('Hello Express');
});

*/

// Serve an HTML file -- Send the index.html file as a response to GET requests to the / path -- 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});




































module.exports = app;
