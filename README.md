# C-squared

A team collaboration application that includes smart scheduling and RSVP for group events and searching features

## Inspiration
A lot of people including us have experienced inconvenience when talking with friends/colleagues in group chats. For example, it's very hard to plan an event or hangout in a group chat with a big number of people because people check messages on different frequencies and event invites can be easily "buried" by flood of messages.  Also, as the world is becoming more and more globalized today, people now have more different interests and fields of knowledge. We sometimes run into situations when we don't know about some terms or new technology talked in a group chat. 
As a result, we decide to develop a real-time chatting platform where people talk, relax, plan events and learn about new knowledge. That's why we decide to develop C-Squared which stands for Collaboration times Calendar.

## What it does
Besides the main feature as a live-chat application, the two most important features our application has are: create event and join event on group chat; search with "Bing" by typing in text box. Although Microsoft's 365 Office Mail automatically adds an event to the user's calendar once the invite is accepted, we found it inconvenient that the event organizer has to spend time sending out emails. Wouldn't it be nice if event organizer can send out event on group chat by simply typing "/event Surfing October 16, 2017 12:00" and people interested in the vent can RSVP by typing "/rsvp Surfing." At the mean time the event user registered for will be added to his/her personal web calendar.
Although it's not a bad idea to "Bing" it, wouldn't it be awesome if we can search it on text box on a group chat by simply typing, "/search LearnSurfing" and we will know the answer within a second? 

## How we built it
C-Squared is composed of three parts: server, frontend and database. We use Node.js and Socket.IO to build our server which communicates with both database and frontend. It retrieves data from database and parse to frontend such as login authorization. It also stores data gathered from frontend and store it in database such as creation of events. We use JavaScript and jQuery library to control behavior of elements and use HTML and CSS to control presentation and formatting. Besides, we use SQL to design our database.

## Challenges we ran into
The challenges we faced during the development of C-Squared including that none of us know about Node.js nor Socket.IO. It's our first time developing a real-time chatting application. We had to learn a lot at the spot like jQuery, Microsoft Azure, JavaScript. Our project is very time-consuming since we have to learn and build a well done web application in such a short period of time. However, it's very innovative and interesting experience to us as not only did we learn how to write more efficient as well as powerful code but also we learned how to collaborate with our teammates.

## Accomplishments that we're proud of
We are proud that we were able to learn new programming languages and concepts and apply them to write our application in only 36 hours. We are proud that we collaborated with each other and worked as a team. We respected every member's voice and we helped each other when facing problems. We didn't blame on our teammates when something went wrong. We are proud that we never gave up when we spent hours on researching about Microsoft Azure and Node.js, when we were stuck in bugs nor when we were exhausted after 30 hours of coding without sleep. We are proud we made it to the end.

## What we learned
We have learned about many new programming languages and concepts including Node.js, JavaScipt, jQuery, Microsoft Azure and so on. Also, we learned how to work in a team and collaborate with people from different background. As this is our first HackGT experience, we now have a better understanding of Georgia Tech culture and computer science spirit - never give up.

## What's next for C-Squared
We plan to implement more features for C-Squared including event notification, drag and drop scheduling and more chatbot functionalities and more stable server. More than that we plan to develop both android and ios applications for C-Squared using React.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Developers would need to have [Node.js](https://nodejs.org/en/download/), [npm](https://docs.npmjs.com/cli/install) and [MySQL](https://dev.mysql.com/downloads/installer/) at bare-minimum. 

### Installing

Local host deployment with: 

```
npm.start
```

And access the WebApp at: 

```
localhost:3000
```

## Built With

* [Azure](https://docs.microsoft.com/en-us/azure/) - The web framework used
* [npm](https://docs.npmjs.com/) - Dependency Management
* [MySQL](https://dev.mysql.com/doc/) - Database Management

## Authors

* **John Lin** - *Initial work* - [GitHub](https://github.com/jlin332)
* **Jiahong Sun** - *Initial work* - [GitHub](https://github.com/xingxing888)
* **Zihan Xu** - *Initial work* - [GitHub](https://github.com/xuzihan0311)

See also the list of [contributors](https://github.com/xuzihan0311/C-squared/settings/collaboration) who participated in this project.

## Acknowledgments

* HackGT Project
* Inspired by: Atlassian, Microsoft Frameworks and Technology
