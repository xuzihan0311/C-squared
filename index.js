// var http = require('http'),
//     fs = require('fs'),
//     express = require('express'),
//     path = require('path');
//
// var app = express();
// app.use(express.static('public'));
//
// fs.readFile('./views/chat-page.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(8000);
// });

// app.get('/', function(req, res) {
//     var html = fs.readFileSync('./views/chat-page.html');
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(res);
//         response.end();
//     }).listen(8000);
// });

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/chat-page.html');
    //It will find and locate index.html from View or Scripts
});

app.listen(3000);

console.log("Running at Port 3000");
