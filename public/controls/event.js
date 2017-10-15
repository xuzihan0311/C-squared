$( document ).ready(function() {
  
  if (!Cookies.get("LoginUsername")) {
    $("#guard-wrapper").css("display", "inline");
    if (Cookies.get("RmbUsername")) {
      $("#username-in").val(Cookies.get("RmbUsername"));
      $('#rmb-btn').attr("checked", true);
    }
  }
  
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
 
 //  var newEvent = 
 //  {
 //    title:"Test", 
 //    start:new Date("October 15, 2017")
 //  };
 //  
 //  var newEvents = 
 //  [
 //  {
 //   title: "Test1",
 //   start:new Date("October 15, 2017")
 //  },
 //  {
 //    title: "Test2",
 //    start:new Date("October 16, 2017")
 //  }
 // ]
 //  
 //  $(".calendar-holder").fullCalendar('renderEvents', newEvents, true);
 
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
  
  $("#profile-btn").click(function() {
    $("#username").text(Cookies.get("LoginUsername"));
    $(".dropdown-content").attr("style", "display: inline;");
  });
  
  $(document).on("mouseup.hideDocClick", function(e) {
    var container = $(".dropdown-content");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.attr("style", "display: none;");
    }
  });
  
  $("#logout-btn").click(function() {
    $(".dropdown-content").attr("style", "display: none;");
    $("#chat-btn").trigger("click");
    $("#messages").empty();
    Cookies.remove("LoginUsername");
    $("#guard-wrapper").css("display", "inline");
    $("#username-in").val("");
    if (Cookies.get("RmbUsername")) {
      $("#username-in").val(Cookies.get("RmbUsername"));
    }
    $("#password-in").val("");
  })
  
});
