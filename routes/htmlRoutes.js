var db = require("../models");
var helperFunctions = require("../routes/helperFunctions.js")
var searchMovie = helperFunctions.searchMovie;
var checkDbMovie = helperFunctions.checkDbMovie;


module.exports = function (app) {
  // Load index page
  // app.get("/", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load the home page that displays all reviews in descending order
  app.get("/", function(req, res) {
      res.render("home");
  });

  // app.get("/home/new", function(req, res) {
  //     res.render("home");
  // });

  // app.get("/home/year", function(req, res) {
  //     res.render("home");
  // });

  // app.get("/home/title", function(req, res) {
  //     res.render("home");
  // });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Movie Search Page
  app.get("/movie/search/", function (req, res) {
    res.render("movieSearch")
  });

  // Movie Results Page
  app.get("/movie/search/:name", function (req, res) {
    movieName = req.params.name;
    searchMovie(movieName, function (movieResults) {
      checkDbMovie(movieResults, function(checkedResults){
        res.render("movieResults", { results: checkedResults });
      })
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
