$( document ).ready(function() {
 
  $("#chat-button").mouseover(function() {
    $("#chat-icon").attr("src", "../resources/chat-icon-blue.png");
  })
    
  .mouseout(function() {
    if (!$("#chat-button").hasClass("menu-button-open")) {
      $("#chat-icon").attr("src", "../resources/chat-icon-grey.png");
    }
  });
 
  $("#chat-button").click(function() {
    
  });
    
  $("#calendar-button").mouseover(function() {
    $("#calendar-icon").attr("src", "../resources/calendar-icon-blue.png");
  })
    
  .mouseout(function() {
    if (!$("#calendar-button").hasClass("menu-button-open")) {
      $("#calendar-icon").attr("src", "../resources/calendar-icon-grey.png");
    }
  });
 
  $("#calendar-button").click(function() {
    
  });
 
});