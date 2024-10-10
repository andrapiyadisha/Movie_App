import axios from "axios";

// Fetch all movies
export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie");
    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; 
  }
};

// User authentication
export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    if (res.status !== 200 && res.status !== 201) {
      console.log("Unexpected Error Occurred");
      throw new Error("Authentication failed");
    }

    return res.data;
  } catch (error) {
    console.error("Error during authentication:", error.response ? error.response.data : error.message);
    throw error; 
  }
};

// Get movie details
export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; 
  }
};

// Create a new booking
export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });

    if (res.status !== 201) {
      throw new Error("Booking failed");
    }

    return res.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error; 
  }
};

// Get user bookings
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`/user/booking/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error; 
  }
};

// Delete a booking
export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`/booking/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete booking");
    }
    return res.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error; 
  }
};

// Get user details
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; 
  }
};

// Add a movie
export const addMovie = async (data) => {
  
  if (!data.title || !data.releaseDate || !data.posterUrl) {
    throw new Error("All fields except actors are required.");
  }

  try {
    const res = await axios.post("/movie", {
      title: data.title,
      description: data.description,
      releaseDate: data.releaseDate,
      posterUrl: data.posterUrl,
      actors: data.actors,
      admin: localStorage.getItem("adminId"),
    });

    if (res.status !== 201) {
      throw new Error("Unexpected error occurred while adding movie.");
    }

    return res.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// Get admin data
export const getAdminData = async () => {
  const adminId = localStorage.getItem("adminId");
  try {
    const res = await axios.get(`/admin/${adminId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error; 
  }
};

// Admin authentication
export const sendAdminAuthRequest = async (data) => {
  console.log("Admin login data:", data);
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (error) {
    console.error('Error during admin login:', error.response ? error.response.data : error.message);
    throw error; 
  }
};
