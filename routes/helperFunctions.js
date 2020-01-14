require("dotenv").config();
var db = require("../models");
var axios = require("axios")
// var moment = require("moment")
// var keys = require("./keys");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchText = process.argv.splice(3).join("+");

function searchMovie(movieName, cb) {
    queryURL = "http://www.omdbapi.com/?apikey=trilogy&type=movie&s=" + movieName
    axios.get(queryURL).then(function (results) {
        cb(results.data.Search);
    });
};

function findMovie(imdbId, cb) {
    queryURL = "http://www.omdbapi.com/?apikey=trilogy&i=" + imdbId
    axios.get(queryURL).then(function (results) {
        cb(results.data);
    });
};
function checkDbMovie(movieResults, cb) {
    counter = 1;
    movieResults.forEach(element => {
        db.moviesList.findOne({ where: { imdbid: element.imdbID } }).then(function (results) {
            if (results != null) {
                element.source = "db";
                element.boatsValue = results.boatsValue;
            }
            else {
            };
            if (counter == movieResults.length){
                cb(movieResults);
            }
            else{
                counter++;
            };
        });
    });
};
function findSong() {
    if (searchText == "") {
        searchText = "The Sign"
    }

    spotify.search({ type: 'track', query: searchText, limit: 1 }, function (err, results) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        if (results.tracks.items.length != 0) {
            songInfo = results.tracks.items[0];

            songInfoArray = [
                "Artist(s): " + songInfo.artists[0].name,
                "Song Name: " + songInfo.name,
                "Song URL: " + songInfo.external_urls.spotify,
                "Album Name: " + songInfo.album.name,
                "-------------------------------------------------------------------------------------"
            ];
            songInfoStr = songInfoArray.join("\n");
            console.log(songInfoStr);
        }
        else {
            console.log("Song " + searchText + " was not found, please try a different song")
        }
    });
};

function runSwitch() {
    switch (command) {
        case "select-movie":
            findMovie(searchText);
            break
        case "movie-this":
            searchMovie(searchText);
            break
        case "spotify-this-song":
            findSong();
            break
        case "do-what-it-says":
            findTextFile();
            break
        default:
            console.log("please provide a valid command, see readme.md for help")
    };

};

runSwitch();

module.exports = { searchMovie: searchMovie, findMovie: findMovie, checkDbMovie: checkDbMovie };