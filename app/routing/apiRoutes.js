var express = require('express');
var app = require('../../server');
var dust = require('dustjs-linkedin');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var questionsData = require('../data/matchQuestions');

// get all friends
router.get('/api/friends', function(req, res, next) {
  var friends = require('../data/friends');
  console.log('inside of api friends in apiRoutes', friends);
  res.raw({allFriends: friends});
})

router.post('/api/friends', function(req, res, next) {
  //console.log(req.body);
  var bestMatch = findBestMatch(req.body);
  console.log(bestMatch);


  var compiledSurvey = dust.compile(path.join(__dirname, "../views/bestmatch.dust"), 'bestmatch');
  dust.loadSource(compiledSurvey);

  res.render('bestmatch', {bestMatch: bestMatch});
  //res.send('Will this message be sent?');
});

function findBestMatch(data) {
  var friends = require('../data/friends');
  var aFriend = {};
  aFriend.name = data.name;
  aFriend.photo = "../assets/images/avataaars(5).png" || null;
  var score = data.score.map(s => Number(s));
  aFriend.score = score;

  // get a shallow copy of friends
  var compareFriends = [],
      friendsReady = [];
  
  compareFriends = friends.slice(0, friends.length -1);
  console.log(compareFriends);
  compareFriends.forEach(f => f.score.forEach(s => Math.abs(Number(s.score)-Number(aFriend.score))));
  // get an array for sum of each different score from a new friend
  friendsReady = compareFriends.map(f => f.score.reduce((total, amount) => total + amount, 0));
  // index of min value
  var minIndex= friendsReady.indexOf(Math.min.apply(Math, friendsReady));
  if (minIndex < 0 || minIndex > friendsReady.length-1) minIndex = 1;

  // insert a new friend to the array
  friends.push(aFriend);
  return compareFriends[minIndex].name;
}

router.post('/api/survey', function(req, res, next) {
  //res.send('respond with a resource');
  var friend = {};
  friend.name = req.body.name;
  friend.photo = "../assets/images/avataaars(5).png";
  var score = req.body.score.forEach(s => number(s));
  friend.score = score;

  console.log('inside /api/survey', friend);
  res.redirect('/survey');  
});

module.exports = router;