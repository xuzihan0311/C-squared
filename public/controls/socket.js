$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $("#login-btn").click(function() {
      socket.emit('login', { username: $('#username-in').val(), password: $('#password-in').val() });
      return false;
  });

  $("#register-btn").click(function() {
      socket.emit('register', { username: $('#username-in').val(), password: $('#password-in').val() });
  });

  socket.on('createEvent', function(eventItem) {
      $(".calendar-holder").fullCalendar('renderEvents', eventItem, true);
      socket.emit('update calendar table', { item: eventItem, username: $('#username-in').val() });
  });

  socket.on('load calendar', function(e) {
      $(".calendar-holder").fullCalendar('renderEvents', e, true);
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<span>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on('bing-search', function(url) {
      window.open(url);
  });

  socket.on('logging in', function(username) {
      //do everything we need when logged in with this username
      $('#guard-wrapper').css("display", "none");
      socket.emit('getCalendar', username);
      //TODO finish loading stuff for this username Login
  });

  socket.on('failed login', function() {
      //set incorrect username or password text field
      //TODO invoke invalid text
  });

  socket.on('transition', function(name) {
     socket.emit('update event table', {username: name.username, item: name.item});
  });

  socket.on('checkEvent', function(name) {
      socket.emit('check event table', name);
  });

  $("#messages").lettering();
        var text = $("#jquerybuddy"),
        numLetters = text.find("span").length;
        function randomBlurize() {
        text.find("span:nth-child(" + (Math.floor(Math.random()*numLetters)+1) + ")")
        .animate({
          'textShadowBlur': Math.floor(Math.random()*25)+4,
          'textShadowColor': 'rgba(0,100,0,' + (Math.floor(Math.random()*200)+55) + ')'
        });
    // Call itself recurssively
        setTimeout(randomBlurize, 100);
        randomBlurize();
    }
});
