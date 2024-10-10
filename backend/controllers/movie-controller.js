const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Movie = require("../models/Movie");

// Add a new movie
const addMovie = async (req, res) => {
  console.log("Request Body:", req.body);

  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

  
  if (!title || !description || !posterUrl) {
    console.error("Validation failed: All fields except actors are required.");
    return res.status(400).json({ message: "Title, description, and poster URL are required." });
  }

  const filteredActors = Array.isArray(actors) ? actors.filter(actor => actor.trim() !== '') : [];

  const releaseDateObj = new Date(releaseDate);
  if (isNaN(releaseDateObj.getTime())) {
    console.error("Validation failed: Invalid release date format.");
    return res.status(400).json({ message: "Invalid release date format." });
  }

  const movie = new Movie({
    title,
    description,
    releaseDate: releaseDateObj,
    posterUrl,
    featured,
    actors: filteredActors, 
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await movie.save({ session });

    
    const adminUser = await Admin.findOne(); 
    if (adminUser) {
      adminUser.addedMovies.push(movie._id);
      await adminUser.save({ session });
    }

    await session.commitTransaction();
    return res.status(201).json({ movie });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error adding movie:", error.message);
    return res.status(500).json({ message: "Error creating movie", error: error.message });
  } finally {
    session.endSession();
  }
};






// Get all movies
const getAllMovies = async (req, res, next) => {
  const movies = await Movie.find();
  return res.json({ movies });
};



const getMovieById = async (req, res, next) => {
  const id = req.params.id;

 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Movie ID" });
  }

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ movie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
};
