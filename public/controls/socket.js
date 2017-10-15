$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $("#login-btn").click(function() {
      var username = document.getElementById('username-in');
      var password = document.getElementById('password-in');
      socket.emit('login', username, password);
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('bing-search', function(url) {
      window.open(url);
  });

  socket.on('logging in', function(username) {
      //do everything we need when logged in with this username
  });

  socket.on('failed login', function() {
      //set incorrect username or password text field
  });
});
