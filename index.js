const bingURL = 'https://api.cognitive.microsoft.com/bing/v5.0';
const bingKey = '1a4ff9de6b4c45bb92a8dd3d06439546';

var bing = require('node-bing-api')({accKey: bingKey});
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var connection = require('tedious').Connection;
var request = require('tedious').Request;

var config =
    {
        userName: 'jlin332',
        password: 'C-squared',
        server: 'csquared.database.windows.net',
        options: {
            database: 'CsquaredDatabase'
        }
    }
var conn = new connection(config);

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/chat-page.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        if (msg.indexOf("/search") > -1) {
            bingSearch(msg.substring(8, msg.length), function(search) {
                io.emit('bing-search', search);
            });
        }
    });

    socket.on('login', function(username, password) {
        //handle login: query SQL table if not there then respond with error code
        //fetch corresponding calendar
        conn.on('connect', function(err)) {
            if (err) {
                console.log(err);
            } else {
                queryDatabase(username, password, function(responseCode));
                if (responseCode == 1) {
                    io.emit('logging in', username);
                } else {
                    io.emit('failed login');
                }
            }
        }
    });

    socket.on('register', function(username, password) {
        //handle register new user: insert row into table
    });
});

function queryDatabase(username, password, responseCode) {
    req = new request("SELECT COUNT(*) FROM Users WHERE Username="
        + username + " and Password=" + password, function(err, rowCount, rows) {
            responseCode(rowCount);
        });
    conn.execSql(req);
}

function bingSearch(msg, search) {
    bing.web(msg, {
        responseFilter: 'Webpages'
    }, function(error, res, body) {
        var linkBody = body.webPages.webSearchUrl;
        var url = linkBody.split(',');
        search(url[0]);
    });
}

http.listen(port, function(){
    console.log('listening on *:' + port);
});
