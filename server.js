const express = require("express");
const helmet = require('helmet');
const dust = require("dustjs-linkedin");
const dust_helpers = require("dustjs-helpers");
const adaro = require("adaro");
const bodyParser = require("body-parser");
const path = require("path");
const createError = require('http-errors');
const PORT = process.env.PORT || 8080;

var app = express();
app.use(helmet.noCache());
// express static middleware
app.use(express.static(path.join(__dirname, '/app/public')));

var apiRouter = require('./app/routing/apiRoutes');
var htmlRouter = require('./app/routing/htmlRoutes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.engine("dust", adaro.dust({}));
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, '/app/views'));


//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
app.use('/api/friends', apiRouter);
app.use('/api', apiRouter);
app.use('/', htmlRouter);




// app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
// app.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
// app.use('/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// 
app.listen(PORT, function() {
 console.log('App listening on PORT: ' + PORT);
});

module.exports = app;
