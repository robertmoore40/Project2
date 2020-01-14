$(".dropdown-trigger").dropdown();

var globalID;
var actionBtn;

$(document).ready(function () {

  console.log("load")
  var offsetVal = $("#sort-btn").data("offset");
  popularMovies(offsetVal);
  // take user to the add page
  $("#add-review").on("click", function () {
    window.location.href = "/movie/search";
  })

  $("#movie-sort a").on("click", function () {
    $("#sort-btn").attr("data-offset", "0");
    actionBtn = "sort-by-btn"
    var offsetVal = $("#sort-btn").data("offset");
    $("#sort-btn").attr("data-sort", $(this).text());
    sortBy($(this).text(), offsetVal);
  });

  // loads movie cards from the DB based on popular (boats value descending)
  function popularMovies(offset) {
    console.log("home");
    $.ajax({
      url: "/api/movie-find/popular/" + offset,
      method: "GET"
    }).then(function (response) {
      checkReturn(response, offset);
      globalID = response[0].imdbid;
      for (var i = 0; i < response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).attr("data-imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    })
  }

  function newMovies(offset) {
    $.ajax({
      url: "/api/movie-find/newest/" + offset,
      method: "GET"
    }).then(function (response) {
      checkReturn(response, offset);
      globalID = response[0].imdbid;
      for (var i = 0; i < response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).attr("data-imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }

  function yearMovies(offset) {
    $.ajax({
      url: "/api/movie-find/year/" + offset,
      method: "GET"
    }).then(function (response) {
      checkReturn(response, offset);
      globalID = response[0].imdbid;
      for (var i = 0; i < response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).attr("data-imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }

  function titleMovies(offset) {
    $.ajax({
      url: "/api/movie-find/title/" + offset,
      method: "GET"
    }).then(function (response) {
      checkReturn(response, offset);
      globalID = response[0].imdbid;
      for (var i = 0; i < response.length; i++) {
        // front
        $(".main-card-" + i).find("#poster-img").attr("src", response[i].poster);
        $(".main-card-" + i).find("#movie-title").text(response[i].title);
        $(".main-card-" + i).find("#boat-value").text(response[i].boatsValue);
        $(".main-card-" + i).find(".up-boat").data("imdbid", response[i].imdbid)
        $(".main-card-" + i).find(".down-boat").data("imdbid", response[i].imdbid);
        $(".main-card-" + i).attr("data-imdbid", response[i].imdbid);
        // back
        $(".main-card-" + i).find(".card-title").text(response[i].title);
        $(".main-card-" + i).find("#movie-year").text("Year: " + response[i].year);
        $(".main-card-" + i).find(".rating").text("Rating: " + response[i].rated);
        $(".main-card-" + i).find(".plot").text("Plot: " + response[i].plot);
      }
    });
  }


  $(".up-boat").on("click", function () {
    actionBtn = "up-boat-btn"
    imdbid = $(this).data("imdbid");
    console.log(imdbid);
    $.ajax({
      url: "/api/movie/up-boat/" + imdbid,
      method: "PUT"
    }).then(function (response) {
      var currentOffset = $("#sort-btn").attr("data-offset");
      var whichSort = $("#sort-btn").attr("data-sort");
      sortBy(whichSort, currentOffset);
      M.toast({
        html: "Thank you for the review!",
        classes: "teal rounded"
      });
    });
  });

  $(".down-boat").on("click", function () {
    actionBtn = "down-boat-btn"
    imdbid = $(this).data("imdbid");
    // console.log(imdbid);
    $.ajax({
      url: "/api/movie/down-boat/" + imdbid,
      method: "PUT"
    }).then(function (response) {
      var currentOffset = $("#sort-btn").attr("data-offset");
      var whichSort = $("#sort-btn").attr("data-sort");
      sortBy(whichSort, currentOffset);
      M.toast({
        html: "Thank you for the review!",
        classes: "teal rounded"
      });
    });
  });

  $(".card").on("click", function () {
    imdbid = $(this).data("imdbid");
    // console.log(imdbid)
    $.ajax({
      url: "/api/movie/" + imdbid,
      method: "GET"
    }).then(function (response) {
      $("[data-imdbid = " + imdbid).find(".rating").text("Rating: " + response.Rated);
      $("[data-imdbid = " + imdbid).find(".plot").text("Plot: " + response.Plot);
    });
  });

  $("#next-btn").on("click", function () {
    actionBtn = "next-btn";
    var currentOffset = $("#sort-btn").attr("data-offset");
    var whichSort = $("#sort-btn").attr("data-sort");
    var newOffset = parseInt(currentOffset) + (+5);
    $( ".card" ).each(function() {
      $(this).toggle("slide", { direction: "right" });
    });
    sortBy(whichSort, newOffset);
    $( ".card" ).each(function() {
      $(this).toggle("slide", { direction: "right" });
    });
  });

  $("#back-btn").on("click", function () {
    actionBtn = "back-btn";
    var currentOffset = $("#sort-btn").attr("data-offset");
    var whichSort = $("#sort-btn").attr("data-sort");
    if (currentOffset > 4) {
      var newOffset = parseInt(currentOffset) - (+5);
      $( ".card" ).each(function() {
        $(this).toggle("slide", { direction: "left" });
      });
      sortBy(whichSort, newOffset);
      $( ".card" ).each(function() {
      $(this).toggle("slide", { direction: "right" });
    });
    }
    else {
      M.toast({
        html: "You are at the beginning of the movie list!",
        classes: "amber rounded"
      });
    }

  });

  function sortBy(sortType, offset) {
    switch (sortType) {
      case 'Popular':
        popularMovies(offset);
        $("#sort-name").text("Popular")
        break;
      case 'New':
        newMovies(offset);
        $("#sort-name").text("New")
        break;
      case 'Year':
        // console.log("in year case")
        yearMovies(offset);
        $("#sort-name").text("Year")
        break;
      case 'Title':
        // console.log("in title case")
        titleMovies(offset);
        $("#sort-name").text("Title")
        break;
    }
  };

  function checkReturn (array, offset) {
    console.log("Global ID: " + globalID);
    console.log("Button ID: " + actionBtn);

    if (actionBtn == "next-btn" || actionBtn == "back-btn"){
      if (array[0].imdbid === globalID) {
        console.log("list ended")
        M.toast({
              html: "You are at the end of the movie list!",
              classes: "amber rounded"
            });
      }
      else{
        if (actionBtn == "next-btn"){
          $("#sort-btn").attr("data-offset", offset);
        }
        else if (actionBtn == "back-btn"){
          $("#sort-btn").attr("data-offset", offset);
        };
      };
    };
  };
});
