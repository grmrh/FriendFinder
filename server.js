const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// express static middleware
app.use(express.static(path.join(__dirname, "app/public")));

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
})
