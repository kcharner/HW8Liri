
var userAction = process.argv[2];
var userQuery = process.argv[3];

//Twitter request Start
var tweetKey = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter({
             consumer_key: tweetKey.twitterKeys.consumer_key,
             consumer_secret: tweetKey.twitterKeys.consumer_secret,
             access_token_key: tweetKey.twitterKeys.access_token_key,
             access_token_secret: tweetKey.twitterKeys.access_token_secret
            })

if (userAction === "my-tweets") {
	client.get('statuses/user_timeline', function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i <= tweets.length - 1; i++) {
  				console.log(tweets[i].text);
  			}
  		}
	});
}
//Twitter request end

//Spotify request start
var spotify = require("Spotify");

if (userAction === "spotify-this-song") {
	spotify.search({ type: 'track', query: userQuery }, function(err, data) {
		if ( !err ) {
		        console.log("Artist: " + data.tracks.items[0].artists.name); //need help w/ this one
		        console.log("Album: " + data.tracks.items[0].album.name);
		        console.log("Song Title: " + data.tracks.items[0].name);
		        console.log("Listen to a preview: " + data.tracks.items[0].preview_url);
		}
	});

}
//Spotify request end

//OMDB request start
var omdbRequest = require("request");

if (userAction === "movie-this") {
	omdbRequest("http://www.omdbapi.com/?t=titanic&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	    console.log(JSON.parse(body));
	    console.log("Movie Title: " + body.title);
	    console.log("Year: " + body.year);
	    console.log("IMDB Rating: " + body.Year);
	    console.log("Country: " + body.Year);
	    console.log("Language: " + body.Year);
	    console.log("Plot: " + body.Year);
	    console.log("Starring: " + body.Year);
	    console.log("Rotten Tomatoes Rating: " + body.Year);
	    console.log("Rotten Tomatoes URL: " + body.Year);
	  	}
	})
}
//OMDB request end

//FS start
var fs = require("fs");

if (userAction === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data){ 
		spotify.search({ type: "track", query: "I Want It That Way" }, function(err, data) {
			if ( !err ) {
			        console.log(data.tracks.items[0].artists);
			}
		});
	})
}
//FS end



// + userQuery +








