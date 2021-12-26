require('dotenv').config();

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

// Implement a Root-Level Request Logger Middleware

app.use(function middleware(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});



// Serve Static Assets -- Here all the statics assets needed by the application are placed (stylesheets, scripts, images...)

app.use('/public', express.static(__dirname + '/public'));

// Serve JSON on a specific route and use the .env file to store configurations options

app.get('/json', function (req, res) {
    let message = 'Hello json';
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        return res.json({ 'message': message.toUpperCase() });
    }
    return res.json({ 'message': message });
});


































module.exports = app;
