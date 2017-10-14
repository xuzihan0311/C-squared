const bingURL = 'https://api.cognitive.microsoft.com/bing/v5.0';
const bingKey = '1a4ff9de6b4c45bb92a8dd3d06439546';

var bing = require('node-bing-api')({accKey: bingKey});
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

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
