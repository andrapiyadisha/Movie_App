const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
    date: {
      type: Date,
    },
    seatNumber: {
      type: Number,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  });


module.exports = mongoose.model("Booking", bookingSchema);
