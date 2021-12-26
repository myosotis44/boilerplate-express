require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// The middleware to handle urlencoded data in POST requests

app.use(bodyParser.urlencoded({ extended: false }));


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

// Chain Middleware to Create a Time Server

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json(
        { time: req.time }
    );
});

// Get Route Parameter Input from the Client

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

// Get Query Parameter Input from the Client

app.get("/name", function (req, res) {
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
});


// Get data from post requests

app.post("/name", function (req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});



module.exports = app;
