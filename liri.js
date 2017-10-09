//var twitterKeys = require("./keys.js")
var request = require("request");
var fs = require("fs");

//possible commands:  my-tweets; spotify-this-song; movie-this; do-what-it-says
var userCommand = process.argv[2];

var tweets = [];

var spotify = [];




if(userCommand === "movie-this"){

	var title = process.argv[3];

	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {


		if (!error && response.statusCode === 200) {

			console.log("Movie Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

		}
	});
}
else if(userCommand === "my-tweets"){




}
else if(userCommand === "spotify-this-song"){

	fs.writeFile("random.txt", process.argv[3], function(error){
		if(error){
			return console.log(error);
		}
	})


	fs.readFile("random.txt", "utf8", function(error, data){

		if(process.argv[3] === undefined){
			var Spotify = require('node-spotify-api');

			var spotify = new Spotify({
				id: "473258b91ba84e76812cf1a43c05c646",
				secret: "935484472d34452a8961306733270af3"
			});

			spotify.search({ type: 'track', query: 'The Sign' }, function(err, song) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}

				console.log(JSON.stringify("Artist: " + song.tracks.items[5].album.artists[0].name, null, 2));
				console.log(JSON.stringify("Song: The Sign")); 
				console.log(JSON.stringify("Preview Link: " + song.tracks.items[5].album.artists[0].external_urls.spotify, null, 2));
				console.log(JSON.stringify("Album: " + song.tracks.items[5].album.name, null, 2));
			});
		}
		else{
			
			var Spotify = require('node-spotify-api');

			var spotify = new Spotify({
				id: "473258b91ba84e76812cf1a43c05c646",
				secret: "935484472d34452a8961306733270af3"
			});

			spotify.search({ type: 'track', query: data }, function(err, song) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}

				console.log(JSON.stringify("Artist: " + song.tracks.items[0].album.artists[0].name, null, 2));
				console.log(JSON.stringify("Song: " + data)); 
				console.log(JSON.stringify("Preview Link: " + song.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
				console.log(JSON.stringify("Album: " + song.tracks.items[0].album.name, null, 2));
			});

		}
	})
}

else if(userCommand === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(error, data){

		console.log(data);
		var Spotify = require('node-spotify-api');

		var spotify = new Spotify({
			id: "473258b91ba84e76812cf1a43c05c646",
			secret: "935484472d34452a8961306733270af3"
		});

		spotify.search({ type: 'track', query: data }, function(err, song) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}

			console.log(JSON.stringify("Artist: " + song.tracks.items[0].album.artists[0].name, null, 2));
			console.log(JSON.stringify("Song: " + data)); 
			console.log(JSON.stringify("Preview Link: " + song.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
			console.log(JSON.stringify("Album: " + song.tracks.items[0].album.name, null, 2));
		});
	})

}