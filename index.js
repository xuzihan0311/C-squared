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
    });
    console.log('a user connected');
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});
