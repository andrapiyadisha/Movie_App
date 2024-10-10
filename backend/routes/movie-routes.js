const express = require("express");
const {getAllMovies, getMovieById, addMovie} = require("../controllers/movie-controller");


const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

module.exports = movieRouter;
  