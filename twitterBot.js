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
	// listening for new tweet
  stream.on('data', function(tweet) {
  	// text of the new tweet
    console.log(tweet.text);
    // splitting the tweet into an array
    var splitTweet = tweet.text.split(" ");
    // // finding the index of "@giphyTweetBot" within the array
    var index = splitTweet.indexOf("@giphyTweetBot");
    // // removing it from the array 
    splitTweet.splice(index, 1);
    console.log(splitTweet);
    // // joining the remaining terms with + inbetween for giphyAPI search
    var searchTerm = splitTweet.join("+");
    console.log(searchTerm);
    // replying to the tweet with the searchTerm 
    replyTweet(tweet.user.screen_name, searchTerm);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


