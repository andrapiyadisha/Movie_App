const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 6
    },
    addedMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
      },
    ],
  });


module.exports = mongoose.model("Admin", adminSchema);
