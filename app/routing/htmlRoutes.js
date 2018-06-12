var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/main', function(req, res, next) {
//   res.send('respond with a resource');
// });





var compiled = dust.compile("app/views/main");
console.log(compiled);
var tmpl = dust.loadSource(compiled);
app.get('/', function(req, res) {//
//res.render('app/views/main', function(err, out) {
res.render(tmpl, function(err, out) {
    if (err != null) {
      console.log(out);
      console.log(err.message);
    }
    else
      $('bodyContent').html(out);
  });
});


module.exports = router;