$(function () {
  var socket = io();
  $('form').submit(function(){
    if ($('#m').val()) {
      socket.emit('chat message', cookies.get("LoginUsername") + ": " + $('#m').val());
    }
    $('#m').val('');
    return false;
  });

  $("#rmb-btn").click(function() {
      if ($("#rmb-btn").attr("checked")) {
          $("#rmb-btn").removeAttr("checked");
      } else {
          $("#rmb-btn").attr("checked", true);
      }
  })

  $("#login-btn").click(function() {
      $("#error-msg").attr("style", "display: none;");
      if ($("#username-in").val() && $("#password-in").val()) {
          socket.emit('login', { username: $('#username-in').val(), password: $('#password-in').val() });
      } else {
          $("#error-msg").text("Invalid input!");
          $("#error-msg").attr("style", "display: inline;");
      }
      return false;
  });

  $("#register-btn").click(function() {
      $("#error-msg").attr("style", "display: none;");
      if ($("#username-in").val() && $("#password-in").val()) {
          socket.emit('register', { username: $('#username-in').val(), password: $('#password-in').val() });
      } else {
          $("#error-msg").text("Invalid input!");
          $("#error-msg").attr("style", "display: inline;");
      }
      return false;
  });

  socket.on('createEvent', function(eventItem) {
      $(".calendar-holder").fullCalendar('renderEvents', eventItem, true);
      socket.emit('update calendar table', { item: eventItem, username: $('#username-in').val() });
  });

  socket.on('load calendar', function(e) {
      console.log("Hit Load Calendar");
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
      if (!cookies.get("LoginUsername")) {
          cookies.set("LoginUsername", username, { expires: 1 });
      }
      if ($("#rmb-btn").attr("checked")) {
          cookies.set("RmbUsername", username, { expires: 365 });
      } else {
          if (cookies.get("RmbUsername") && cookies.get("RmbUsername") == username) {
              cookies.del("RmbUsername");
          }
      }
      $("#guard-wrapper").css("display", "none");
      socket.emit('getCalendar', username);
  });

  socket.on('failed login', function(message) {
      //set incorrect username or password text field
      $("#error-msg").text(message);
      $("#error-msg").attr("style", "display: inline;");
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
