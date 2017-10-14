var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/chat-page.html');
    //It will find and locate index.html from View or Scripts
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

console.log("Running at Port 3000");
