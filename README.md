# Friend Finder

This application allows uses to add self-profile by answering 10 provided questions. With that data the application find best match by comparing the answer to each question. A persion from the base collection becomes qualified to be a friend, who has a minimun difference with the user. 

## web development technology
* Express.js
* dustjs-linkedin as view engine
* npm packages
  * helmet
  * adaro
  * body-parser
  * path
  * http-errors
* Images created from the site for the avatar generator: https://getavataaars.com
* The application utilizes REST Api through AJAX call responding to an event. ALos the server serves the html files, not directly for this case of dustjs view engine, but through dust compiled templates dubbed with data are sent to the client. 

* notes: I could have finished this application development without a view engine, but that way though it seems a large portion of the development procedure overlap the way we did in the class. I spent some time exploring a few popular view engin for the node and express application. After some research I decided to try dustjs with a npm adaro. It turned out that it demaned much more hours just for the completion of the application. Probably not worth...

































###### notes: What is the relationship between REST and AJAX? https://www.quora.com/What-is-the-relationship-between-REST-and-AJAX