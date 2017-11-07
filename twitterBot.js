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



// function to add a tweet
function replyTweet(replyUser) {
	client.post('statuses/update', {status: "Hi @" + replyUser + " !"}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
});
}
 

// Stream to listen for new tweets that state "@giphyTweetBot"
client.stream('statuses/filter', {track: '@giphyTweetBot'}, function(stream) {
  stream.on('data', function(tweet) {
  	console.log(tweet);
    console.log(tweet.text);
    replyTweet(tweet.user.screen_name);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


// client.get('search/tweets', {q: 'giphyTweetBot'}, function(error, tweets, response) {
//    console.log(tweets);

// });