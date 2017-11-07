var $ = require('jquery');
var Twitter = require('twitter');
var twitterKeys = require("./keys.js");
var client = new Twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
});

var keyword = "liz+lemon"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&limit=1&api_key=dc6zaTOxFJmzC";

function replyWithGif() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) { 
    console.log(response);
  });
}

// replyWithGif();



// function to add a tweet in reply to the initial tweet
function replyTweet(replyUser, searchTerm) {
	client.post('statuses/update', {status: "@" + replyUser + " " + searchTerm}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
});
}
 

// Stream to listen for new tweets that state "@giphyTweetBot"
client.stream('statuses/filter', {track: '@giphyTweetBot'}, function(stream) {
  stream.on('data', function(tweet) {
  	// console.log(tweet);
    console.log(tweet.text);
    var tweet = tweet.text;
    var splitTweet = tweet.split(" ");
    // console.log(splitTweet);
    var index = splitTweet.indexOf("@giphyTweetBot");
    console.log(index);
    splitTweet.splice(index, 1);
    console.log(splitTweet);
    var searchTerm = splitTweet.join("+");
    console.log(searchTerm);
    // replyTweet(tweet.user.screen_name, searchTerm);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


