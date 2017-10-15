//Server side

const bingURL = 'https://api.cognitive.microsoft.com/bing/v5.0';
const bingKey = '1a4ff9de6b4c45bb92a8dd3d06439546';

var bing = require('node-bing-api')({accKey: bingKey});
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config =
   {
       userName: 'jlin332',
       password: 'C-squared',
       server: 'csquared.database.windows.net',
       options: {
           database: 'CsquaredDatabase',
           encrypt: true
       }
   }

var connection = new Connection(config);

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

    socket.on('login', function(credentials) {
        //handle login: query SQL table if not there then respond with error code
        //fetch corresponding calendar
        var query = "select Username,Password from Users where Username='" + credentials.username + "' and Password=" + credentials.password;
        var test = connection.on('connect', function(err)
           {
             if (err) { console.log(err) }
           });
         request = new Request(
              query, function(err, rowCount, rows)
                    {
                        if (rowCount == 1) {
                            io.emit('logging in', credentials.username);
                        } else {
                            io.emit('failed login','Invalid login credentials');
                        }
                    }
                );
         connection.execSql(request);
    });

    socket.on('register', function(credentials) {

         var query = "INSERT INTO Users VALUES ('" + credentials.username + "','" + credentials.password + "')";
         console.log(query);
         var test = connection.on('callback', function(err)
            {
              if (err) { console.log(err) }
            });
          request = new Request(query, function(err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        io.emit('logging in', credentials.username);
                    }
                }
           );
          connection.execSql(request);
     });
});


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
