// Dependencies
var $ = require('jquery');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var Twitter = require('twitter');
var axios = require('axios');
// keys to access twitter account
var twitterKeys = require("./keys.js");
var client = new Twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
});

// function to add a tweet in reply to the initial tweet
function replyTweet(replyUser, searchTermURL) {
	client.post('statuses/update', {status: "@" + replyUser + " " + searchTermURL}, function(error, tweet, response) {
	  if (!error) {
	    console.log(tweet);
	  }
	});
}
 
// Stream to listen for new tweets that state "@giphyTweetBot"
client.stream('statuses/filter', {track: '@giphyTweetBot'}, function(stream) {
	// listening for new tweet
  stream.on('data', function(tweet) {
  	// text of the new tweet
    console.log(tweet.text);
    // splitting the tweet into an array
    var splitTweet = tweet.text.split(" ");
    // finding the index of "@giphyTweetBot" within the array
    var index = splitTweet.indexOf("@giphyTweetBot");
    // removing it from the array 
    splitTweet.splice(index, 1);
    console.log(splitTweet);
    // joining the remaining terms with + inbetween for giphyAPI search
    var searchTerm = splitTweet.join("+");
    console.log(searchTerm);
    // axios get request to the giphy API to search for the search term the user tweeted
    axios({
			method: 'get',
			url: "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=1&api_key=dc6zaTOxFJmzC"
		}).then(function(response) {
			console.log(response.data.data[0].url);
			// replying to the tweet with the url for the gif
    	replyTweet(tweet.user.screen_name, response.data.data[0].url);
		});
  });
  // if error console log error
  stream.on('error', function(error) {
    console.log(error);
  });
});

// app listening on port
app.listen(port, function () {
  console.log('app listening on port 3000');
});

