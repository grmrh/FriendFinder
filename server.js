const express = require("express");
const dust = require("dustjs-linkedin");
const dust_helpers = require("dustjs-helpers");
const adaro = require("adaro");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// assign the sut engine to .dust files
//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//app.engine("dust", cons.dust({defaultLayout: "main"}));
app.engine("dust", adaro.dust({}));
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, 'app/views'));

var apiRouter = require('./app/routing/apiRoutes');
var htmlRouter = require('./app/routing/htmlRoutes');

// express static middleware
app.use(express.static(path.join(__dirname, "app/public")));

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
app.use('/', htmlRouter);
app.use('/api', apiRouter);

// app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
// app.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
// app.use('/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));


//require("./routing/public/views/main")(app);
//var routes = require("./app/public/views/")(dust)

// var compiled = dust.compile('./app/public/views/survey');
// var compiledMain = dust.compile('./app/public/views/main');
// var tmpl = dust.loadSource(compiledMain);
// dust.render(tmpl, function(err, out) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(out);
//   }
// })

var compiled = dust.compile("app/views/main");
console.log(compiled);
var tmpl = dust.loadSource(compiled);
app.get('/', function(req, res) {
  res.render('app/views/main', function(err, out) {
    if (err != null) {
      console.log(out);
      console.log(err.message);
    }
    else
      $('bodyContent').html(out);
  });
});


// var tmpl = dust.compile("Hello world! Using Dust version {version}!", "hello");
// dust.loadSource(tmpl);

// dust.render("hello", { version: dust.version }, function(err, out) {
//   if(err) {
//     console.error(err);
//   } else {
//     console.log(out);
//   }
// });

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
