$( document ).ready(function() {
 
  $("#chat-button").mouseover(function() {
    $("#chat-icon").attr("src", "../recourses/chat-icon-blue.png");
  })
    
  .mouseout(function() {
    if (!$("#chat-button").hasClass("menu-button-open")) {
      $("#chat-icon").attr("src", "../recourses/chat-icon-grey.png");
    }
  });
 
  $("#chat-button").click(function() {
    
  });
    
  $("#calendar-button").mouseover(function() {
    $("#calendar-icon").attr("src", "../recourses/calendar-icon-blue.png");
  })
    
  .mouseout(function() {
    if (!$("#calendar-button").hasClass("menu-button-open")) {
      $("#calendar-icon").attr("src", "../recourses/calendar-icon-grey.png");
    }
  });
 
  $("#calendar-button").click(function() {
    
  });
 
});