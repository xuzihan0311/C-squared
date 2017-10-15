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
    if (!$("#chat-btn").hasClass("menu-button-open")) {
      $("#calendar-btn").removeClass("menu-button-open");
      $("#calendar-btn").attr("style", "background-color: transparent;");
      $("#calendar-icon").attr("src", "../resources/calendar-icon-grey.png");
      $("#chat-btn").addClass("menu-button-open");
      $("#chat-btn").attr("style", "background-color: #ffffff;");
      $("#chat-icon").attr("src", "../resources/chat-icon-blue.png");
      $(".calendar-content").attr("style", "display: none;");
      $(".chat-content").attr("style", "display: inline;");
    }
  });
    
  $("#calendar-btn").mouseover(function() {
    $("#calendar-icon").attr("src", "../resources/calendar-icon-blue.png");
  })

  .mouseout(function() {
    if (!$("#calendar-btn").hasClass("menu-button-open")) {
      $("#calendar-icon").attr("src", "../resources/calendar-icon-grey.png");
    }
  });
 
  $(".calendar-holder").fullCalendar({
    
  });
 
  var newEvent = 
  {
    title:"Test", 
    start:new Date("October 15, 2017")
  };
  
  $(".calendar-holder").fullCalendar('renderEvent', newEvent, true);
 
  $("#calendar-btn").click(function() {
    if (!$("#calendar-btn").hasClass("menu-button-open")) {
      $("#chat-btn").removeClass("menu-button-open");
      $("#chat-btn").attr("style", "background-color: transparent;");
      $("#chat-icon").attr("src", "../resources/chat-icon-grey.png");
      $("#calendar-btn").addClass("menu-button-open");
      $("#calendar-btn").attr("style", "background-color: #ffffff;");
      $("#calendar-icon").attr("src", "../resources/calendar-icon-blue.png");
      $(".chat-content").attr("style", "display: none;");
      $(".calendar-content").attr("style", "display: inline;");
      $(".fc-next-button").trigger("click");
      $(".fc-prev-button").trigger("click");
    }
  });
  
  $("#profile-btn").mouseover(function() {
    $("#profile-icon").attr("src", "../resources/profile-icon-blue.png");
  })
  
  .mouseout(function() {
    $("#profile-icon").attr("src", "../resources/profile-icon-grey.png");
  });
  
});
