DROP DATABASE IF EXISTS risingTidedb;
CREATE DATABASE risingTidedb;

CREATE TABLE movies
(
	'imbdid' int NOT NULL AUTO_INCREMENT,
	'title' varchar(255) NOT NULL,
	'year' TEXT NOT NULL,
    'rated' varchar(255) NOT NULL,
    'runtime' varchar(255) NOT NULL,
    'genre' varchar(255) NOT NULL,
    'director' varchar(255) NOT NULL,
    'actors' varchar(255) NOT NULL,
    'plot' varchar(255) NOT NULL,
    'language' varchar(255) NOT NULL,
    'poster' varchar(255) NOT NULL,
	PRIMARY KEY (imbdid)
);
-- INSERT INTO movies (imbdid, title, year, rated, runtime, genre, director, actors, plot, language, poster )-- 
