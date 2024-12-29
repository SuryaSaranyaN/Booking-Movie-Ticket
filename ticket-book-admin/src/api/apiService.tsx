import axios from "axios";

// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Create Theatre API
export const createTheatre = async (payload: any) => {
  try {
    const response = await api.post("/theatre/create", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating theatre:", error);
    throw error;
  }
};

export const updateTheatre = async (theatreId: any, payload: any) => {
  try {
    const response = await api.put(`/theatre/update/${theatreId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating theatre:", error);
    throw error;
  }
}

// Get Theatres API
export const getTheatres = async () => {
  try {
    const response = await api.get("/theatre/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching theatres:", error);
    throw error;
  }
};

export const getTheatreById = async (theatreId: any) => {
  try {
    const response = await api.get(`/theatre/getone/${theatreId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching theatre details:", error);
    throw error;
  }
}


// Delete Theatre API
export const deleteTheatre = async (theatreId: string) => {
  try {
    const response = await api.delete(`/theatre/delete/${theatreId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting theatre:", error);
    throw error;
  }
};

//theatre count

export const getTheatreCount = async () => {
  try {
    const response = await api.get("/theatre/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching theatre count:", error);
    throw error;
  }
}

// get screen by theatre id
export const getScreenByTheatreId = async (theatreId: any) => {
  try {
    const response = await api.get(`/theatre/getscreen/${theatreId}`);
    console.log("Screen details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching screen details:", error);
    throw error;
  }
}

// Cretae Movie API
export const createMovie = async (payload: any) => {
    console.log('Sending data:', payload);  // Log data to verify

  try {
    const response = await api.post("/movie/create", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

// Get Movies API
export const getMovies = async () => {
  try {
    const response = await api.get("/movie/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieCount = async () => {
  try {
    const response = await api.get("/movie/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching movie count:", error);
    throw error;
  }
}

export const updateMovie = async (movieId: string, payload: any) => {
    try {
      const response = await api.put(`/movie/getall/${movieId}`, payload);
      console.log('Movie updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  export const deleteMovie = async (movieId: string) => {
    try {
      const response = await api.delete(`/movie/delete/${movieId}`);
      console.log('Movie deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
  

// Get movie details API
export const getMovieById = async (movieId: string) => {
  try {
    const response = await api.get(`movie/getone/${movieId}`);
    return response.data;

  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

