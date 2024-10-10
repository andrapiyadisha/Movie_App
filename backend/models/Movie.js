const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
    },
    description: {
      type: String
    },
    actors: [{ type: String, default: []}],
    releaseDate: {
      type: Date,
    },
    posterUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: 'Admin'
    }
  });


module.exports = mongoose.model("Movie", movieSchema);
