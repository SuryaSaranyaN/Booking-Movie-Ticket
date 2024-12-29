import axios from "axios";
import { Key } from "react";

// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Create User API
export const createUser = async (payload: any) => {
  try {
    const response = await api.post("user/auth/signup", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//Login API
export const Login = async (payload: any) => {
  try {
    const response = await api.post("user/auth/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//Get all movie
export const getAllMovie = async ()=> {
    try {
      const response = await api.get('movie/getall');
      return response.data;
    } catch (error) {
      console.error('Error getting movie:', error);
      throw error;
    }
  };

  // Upcomming movie

  export const upCommingMovies = async () => {
    try {
      const response = await api.get('movie/upcomingmovie');
      return response.data;
    } catch (error) {
      console.error('Error getting movie:', error);
      throw error;
    }
  };

//current movies
export const currentMoive = async() => {
  try {
    const response = await api.get('movie/currentmovie');
    return response.data;
  } catch (error) {
    console.error('Error getting movie:', error);
    throw error;
  }
}

  // All theatres

  export const getAllTheatre = async () => {
    try {
      const response = await api.get('theatre/getall');
      return response.data;
    } catch (error) {
      console.error('Error getting movie:', error);
    }
  };

  // Get movies by theatre id

  export const getShowsForTheatre = async (theatreId: string) => {
    try {
      const response = await api.get(`movie/theatre/${theatreId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting movie:', error);
    }
  };

  //serach theatre
  export const searchTheatres = async (query: string) => {
    try {
      const response = await api.get(`theatre/location/${query}`);

      return response.data;
    } catch (error) {
      console.error('Error searching theatres:', error);
    }
  }