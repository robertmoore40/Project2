module.exports = function(sequelize, DataTypes) {
  var moviesList = sequelize.define("moviesList", {
    // text: DataTypes.STRING,
    // description: DataTypes.TEXT
    imdbid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    // title, year rated, released, runtime, genre, direction, actors, plot, language, post, IMBD ID - this will be our key/ unique identifier
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    rated: DataTypes.STRING,
    runtime: DataTypes.STRING,
    genre: DataTypes.STRING,
    director: DataTypes.STRING,
    actors: DataTypes.STRING,
    plot: DataTypes.STRING,
    language: DataTypes.STRING,
    poster: DataTypes.STRING,
    boatsValue: DataTypes.INTEGER
});
  return moviesList;
};
