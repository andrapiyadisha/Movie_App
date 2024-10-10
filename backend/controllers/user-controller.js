const mongoose = require("mongoose");
const User = require("../models/User");
const Bookings = require("../models/Bookings");
const bcrypt = require("bcryptjs");

// Get all users
const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  return res.json(users);
};

// Add user
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return res.json({ id: user._id });
};

// Update user
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.findById(userId);

  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  const updatedUser = await user.save();
  return res.json(updatedUser);
};

// Delete user
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  await User.deleteOne({ _id: userId });
  return res.json({ message: "Deleted Successfully" });
};

// User login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.json({ message: "User not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.json({ message: "Incorrect Password" });
  }

  return res.json({ message: "Login Successful", id: existingUser._id });
};

// Get user by ID
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


// Get bookings of user
const getBookingsOfUser = async (req, res, next) => {
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


module.exports = {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getUserById,
  getBookingsOfUser,
};
