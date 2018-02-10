const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const Twit = require('twit');
const util = require('util');

var config = require('./config');
var T = new Twit(config);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {picture: null, error: null});
})

app.post('/', function(req, res) {
	var search_term = req.body.search_term;
	var picture;
	// var num = req.body.num;
	T.get('search/tweets', {q: "" + search_term + " pictures", count: 1, tweet_mode: 'extended'}, function(err, data, response) {
  		// console.log(util.inspect(data.statuses[0].full_text[0], {showHidden: false, depth: null}));
  		// console.log(util.inspect(data.statuses[0].full_text[1], {showHidden: false, depth: null}));
  		// console.log(util.inspect(data, {showHidden: false, depth: null}));
  		console.log(util.inspect(data, {showHidden: false, depth: null}));
  		if (!(data.statuses[0])) {
  			var picture= "none";
  			console.log(picture);
  		} else if (util.inspect(data.statuses[0].full_text[0]) === 'R' && util.inspect(data.statuses[0].full_text[1]) === 'T') {
  			var picture = 'none';
  			console.log(picture);
  		} else if (!(data.statuses[0].hasOwnProperty("extended_entities"))) {
  			var picture = 'none';
  			console.log(picture);

  		} else {
  			var picture = data.statuses[0].extended_entities.media[0].media_url;
  			console.log(picture);
  		}

		res.render('index', {picture: picture, error: null});
		console.log(util.inspect(data, {showHidden: false, depth: null}));

	})
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000!');
})