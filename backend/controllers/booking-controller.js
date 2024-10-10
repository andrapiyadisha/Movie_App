const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");
const Movie = require("../models/Movie");
const User = require("../models/User");

// Create a new booking
const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  if (!movie || !date || !seatNumber || !user) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingMovie = await Movie.findById(movie);
    const existingUser = await User.findById(user);

    if (!existingMovie) {
      return res.status(404).json({ message: "Movie Not Found With Given ID" });
    }
    if (!existingUser) {
      return res.status(404).json({ message: "User not found with given ID" });
    }

    const booking = new Bookings({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);

    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



const getBookingById = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }

  try {
    const bookings = await Bookings.find({ user: id }).populate("movie");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// Delete booking
const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findById(id).populate("user movie");

  if (!booking) {
    return res.json({ message: "Unable to Delete: Booking Not Found" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  await booking.user.bookings.pull(booking);
  await booking.movie.bookings.pull(booking);
  
  await booking.user.save({ session });
  await booking.movie.save({ session });
  
  await Booking.deleteOne({ _id: id }, { session }); 
  await session.commitTransaction();

  return res.json({ message: "Successfully Deleted" });
  session.endSession();
};

module.exports = {
  newBooking,
  getBookingById,
  deleteBooking,
};