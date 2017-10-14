$( document ).ready(function() {
  
  
 
  $("#chat-btn").mouseover(function() {
    $("#chat-icon").attr("src", "../resources/chat-icon-blue.png");
  })

  .mouseout(function() {
    if (!$("#chat-btn").hasClass("menu-button-open")) {
      $("#chat-icon").attr("src", "../resources/chat-icon-grey.png");
    }
  });
 
  $("#chat-btn").click(function() {
    
  });
    
  $("#calendar-btn").mouseover(function() {
    $("#calendar-icon").attr("src", "../resources/calendar-icon-blue.png");
  })

  .mouseout(function() {
    if (!$("#calendar-btn").hasClass("menu-button-open")) {
      $("#calendar-icon").attr("src", "../resources/calendar-icon-grey.png");
    }
  });
 
  $("#calendar-btn").click(function() {
    
  });
  
  $("#profile-btn").mouseover(function() {
    $("#profile-icon").attr("src", "../resources/profile-icon-blue.png");
  })
  
  .mouseout(function() {
    $("#profile-icon").attr("src", "../resources/profile-icon-grey.png");
  });
});
