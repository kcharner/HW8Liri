//setting variables equal to the user's command and request
var userAction = process.argv[2];
var userQuery = process.argv[3];

//Twitter request Start

//initializing twitter-related variables
var tweetKey = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter({
	            consumer_key: tweetKey.twitterKeys.consumer_key,
	            consumer_secret: tweetKey.twitterKeys.consumer_secret,
	            access_token_key: tweetKey.twitterKeys.access_token_key,
	            access_token_secret: tweetKey.twitterKeys.access_token_secret
            })

//conditional to prompt callback based on user command requesting tweets
if (userAction === "my-tweets") {
	client.get('statuses/user_timeline', function(error, tweets, response) {
  		if (!error) {
  			//looping over my tweets array and returning them per user's request
  			for (var i = 0; i <= tweets.length - 1; i++) {
  				console.log(tweets[i].text);
  			}
  		}
	});
}
//Twitter request end

//Spotify request start

//initializing spotify-related variable
var spotify = require("Spotify");

//conditional to prompt callback based on user command requesting song info
if (userAction === "spotify-this-song") {
	spotify.search({ type: 'track', query: userQuery }, function(err, data) {
		if ( !err ) {
			//returning data per user's request
		    console.log("Artist: " + data.tracks.items[0].artists.name); //need help w/ this one
		    console.log("Album: " + data.tracks.items[0].album.name);
		    console.log("Song Title: " + data.tracks.items[0].name);
		    console.log("Listen to a preview: " + data.tracks.items[0].preview_url);
		}
	});

}
//Spotify request end

//OMDB request start

//initializing omdb-related varibale - pulling data using "request" package
var omdbRequest = require("request");

//conditional to prompt callback based on user command requesting movie info
if (userAction === "movie-this") {
	omdbRequest("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		//initializing variable to take response data and parse into an object
		    var data = JSON.parse(body);
		    //returning data per user's request
		    console.log("Movie Title: " + data.Title);
		    console.log("Year: " + data.Year);
		    console.log("IMDB Rating: " + data.imdbRating);
		    console.log("Country: " + data.Country);
		    console.log("Language: " + data.Language);
		    console.log("Plot: " + data.Plot);
		    console.log("Starring: " + data.Actors);
		    console.log("Rotten Tomatoes Rating: " + data.tomatoRating);
		    console.log("Rotten Tomatoes URL: " + data.tomatoURL);
	  	}
	})
}
//OMDB request end

//FS start

//initializing variable to pull data from text file from file system
var fs = require("fs");

//conditional to prompt callback based on user command to take the info in text file and "do what it says"
if (userAction === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data){ 
		spotify.search({ type: "track", query: "I Want It That Way" }, function(err, data) {
			if ( !err ) {
				console.log("Artist: " + data.tracks.items[0].artists.name); //need help w/ this one
		        console.log("Album: " + data.tracks.items[0].album.name);
		        console.log("Song Title: " + data.tracks.items[0].name);
		        console.log("Listen to a preview: " + data.tracks.items[0].preview_url);
			}
		});
	})
}
//FS end








