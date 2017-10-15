//Server side

const bingURL = 'https://api.cognitive.microsoft.com/bing/v5.0';
const bingKey = '1a4ff9de6b4c45bb92a8dd3d06439546';

var bing = require('node-bing-api')({accKey: bingKey});
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var currentEvents = '';

var config =
   {
       userName: 'jlin332',
       password: 'C-squared',
       server: 'csquared.database.windows.net',
       options: {
           database: 'CsquaredDatabase',
           encrypt: true
       }
   }

var connection = new Connection(config);

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/public/views/chat-page.html');
});


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        if (msg.indexOf("/search") > -1) {
            var ind = msg.indexOf("/search");
            bingSearch(msg.substring(ind + 8, msg.length), function(search) {
                io.emit('bing-search', search);
            });
        }
        if (msg.indexOf("/event") > -1) {
            updateCreator(msg.substring(7,msg.length), function(eventItem) {
                io.emit('createEvent', eventItem); //update creator calendar
            });
        }
        if (msg.indexOf("/rsvp") > -1) {
            handleRSVP(msg.substring(6, msg.length), function(name) {
                io.emit('checkEvent', name);
            });
        }
    });

    socket.on('login', function(credentials) {
        //handle login: query SQL table if not there then respond with error code
        //fetch corresponding calendar
        var query = "select Username,Password from Users where Username='" + credentials.username + "' and Password=" + credentials.password;
        var test = connection.on('connect', function(err)
           {
             if (err) { console.log(err) }
           });
         request = new Request(
              query, function(err, rowCount, rows)
                    {
                        if (rowCount == 1) {
                            io.emit('logging in', credentials.username);
                        } else {
                            io.emit('failed login','Invalid login credentials!');
                        }
                    }
                );
         connection.execSql(request);
    });

    socket.on('register', function(credentials) {

         var query = "INSERT INTO Users VALUES ('" + credentials.username + "','" + credentials.password + "')";
         var test = connection.on('callback', function(err)
            {
              if (err) { console.log(err) }
            });
          request = new Request(query, function(err, rowCount, rows) {
                    if (err) {
                        io.emit('failed login','Username already exists!');
                    } else {
                        io.emit('logging in', credentials.username);
                    }
                }
           );
          connection.execSql(request);
     });

     socket.on('getCalendar', function(username) {
         var queryCal = "SELECT EVENTS FROM CALENDAR WHERE USERNAME='"+username+"'";
         var events = '';
         connection.on('connect', function(err)
            {
              if (err) { console.log(err) }
            });
         request = new Request(queryCal, function(err, rowCount, rows) {
                         if (err) {
                             console.log(err);
                         } else if (rowCount == 0) {
                             console.log('No Events');
                         } else {
                             var str = JSON.parse(events);
                             currentEvents = str;
                             io.emit('load calendar', str);
                         }
                     });
        request.on('row', function(columns) {
                columns.forEach(function(column) {
                        events = column.value;
                });
        });
         connection.execSql(request);
     });

     socket.on('update calendar table', function(eventItem) {
         var eve = eventItem.item;
         var username = eventItem.username;
         var newEvents = currentEvents.concat(eve);
         newEvents = JSON.stringify(newEvents);
         var query = "UPDATE CALENDAR SET EVENTS='" + newEvents + "' WHERE USERNAME='"+username+"'";
         connection.on('connect', function(err)
            {
              if (err) { console.log(err) }
            });
         request = new Request(query, function(err, rowCount, rows) {
                         if (err) {
                             console.log(err);
                         } else {
                             currentEvents = newEvents;
                             io.emit('transition', {username: username, item: eve})
                         }
                     });
         connection.execSql(request);
     });

     socket.on('update event table', function(things) {
         var title = things.item[0].title;
         var date = things.item[0].start;
         console.log(date);
         var query = "INSERT INTO EVENTS VALUES('"+ title +"','" + date +"')";
         connection.on('connect', function(err)
            {
              if (err) { console.log(err) }
            });
         request = new Request(query, function(err, rowCount, rows) {
                         if (err) {
                             console.log(err);
                         }
                     });
         connection.execSql(request);
     });

     socket.on('check event table', function(e) {
         var event = [{
             title: "",
             start: ""
         }];
         var query = "select EVENT_NAME,DATE from EVENTS where EVENT_NAME='" + e +"'";
         var test = connection.on('connect', function(err)
            {
              if (err) { console.log(err) }
            });
          request = new Request(
               query, function(err, rowCount, rows)
                     {
                         if (rowCount == 1) {
                             //io.emit('createEvent', );
                             //console.log(event);
                             io.emit('load calendar', event);
                         }
                     }
                 );
            request.on('row', function(columns) {
                columns.forEach(function(column) {
                        if (column.metadata.colName == 'EVENT_NAME') {
                            event[0].title = column.value;
                        } else if (column.metadata.colName == 'DATE') {
                            event[0].start = column.value;
                        }
                });
            });

          connection.execSql(request);
     });
});


function bingSearch(msg, search) {
    bing.web(msg, {
        responseFilter: 'Webpages'
    }, function(error, res, body) {
        var linkBody = body.webPages.webSearchUrl;
        var url = linkBody.split(',');
        search(url[0]);
    });
}

function updateCreator(msg, eventItem) {
    var spaceIndex = msg.indexOf(" ");
    var eventName = msg.substring(0, spaceIndex);
    var time = msg.substring(spaceIndex + 1, msg.length);
    var newEvent = [{ title: eventName,start: new Date(time) }];
    eventItem(newEvent);
}

function handleRSVP(msg, eventItem) {
    //msg = event name
    //console.log(msg);
    eventItem(msg);
}

http.listen(port, function(){
    console.log('listening on *:' + port);
});
