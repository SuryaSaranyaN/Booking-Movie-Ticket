import mongoose from 'mongoose';
import Theatre from '../model/theatreModel.js';
import Movie from '../model/movieModel.js';

export const createMovie = async (req, res) => {
  // console.log('req.body:', req.body);
  const { name, genre, duration, cast, rating,release_date, theatre_id, screen_id, date, description } = req.body;

     // Check if all required fields are present
     if (!name || !genre || !duration || !cast || !rating || !req.files?.trailer_url || !req.files?.poster_url || !theatre_id || !screen_id) {
      return res.status(400).json({ message: 'All fields are required, including trailer and image files' });
    }
  try {
  // Access uploaded file paths
  const trailerUrl = req.files['trailer_url'] ? `/public/trailers/${req.files['trailer_url'][0].filename}` : null;
  const posterUrl = req.files['poster_url'] ? `/public/movie-images/${req.files['poster_url'][0].filename}` : null;

  // const totalDurationInMinutes = convertDecimalToMinutes(parseFloat(duration));

    // Find the Theatre
    const theatre = await Theatre.findById(theatre_id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    // Convert screen_id to ObjectId
    const { ObjectId } = mongoose.Types;
    const screenObjectId = new ObjectId(screen_id);

    // Find the Screen by its _id
    const screen = theatre.screens.id(screenObjectId);
    console.log('screen:', screen);
    if (!screen) {
      return res.status(404).json({
        message: `Screen with ID ${screen_id} not found in the selected theatre`,
        screens: theatre.screens.map(s => s._id), // Provide available screen IDs for debugging
      });
    }

    // Check if the Screen is already showing a movie
    if (screen.current_movie) {
      return res.status(400).json({
        message: `Screen ${screen_id} is already showing another movie`,
        current_movie: screen.current_movie,
      });
    }

    // Create the Movie
    const newMovie = new Movie({
      name,
      genre,
      duration,
      cast,
      rating,
      trailer_url:trailerUrl,
      poster_url:posterUrl,
      theatre_id,
      screen_id: screen._id,
      date,
      release_date,
      description,
    });

    const savedMovie = await newMovie.save();

    // Assign the Movie to the Screen
    screen.current_movie = savedMovie._id;
    await theatre.save();

    res.status(201).json({
      message: 'Movie created and assigned to screen successfully',
      movie: savedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating movie',
      error: error.message,
    });
  }
};


export const updateMovie = async (req,res)=>{
  try{
    const {id} = req.params;
    const {name, genre, duration, cast, rating, trailer_url, poster_url, theatre_id, screen_id, date,release_date, description} = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(id,{name, genre, duration, cast, rating, trailer_url, poster_url, theatre_id, screen_id, date,release_date, description},{new:true});
    res.status(200).json(updatedMovie);
  }catch(error){
    res.status(500).json({message:"Error updating movie",error:error.message});
  }
}

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error: error.message });
  }
}

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
}

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully", deletedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error: error.message });
  }
}



 export const getMovieCount = async (req, res) => {
  try {
    const movies = await Movie.find();
    const movieCount = movies.length;
    return res.status(200).json({ message: 'Movie count fetched successfully', movieCount });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching movie count', error: error.message });
  }
 }
 
export const getUpcomingMovies = async (req, res) => {
  try {
    const today = new Date();
    const upcomingMovies = await Movie.find({ release_date: { $gt: today } }).sort({ release_date: 1 });
    res.status(200).json(upcomingMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming movies', error: error.message });
  }
};

export const getCurrentMovies = async (req, res) => {
  try {
    const today = new Date();
    const currentMovies = await Movie.find({ release_date: { $lte: today } }).sort({ release_date: -1 });
    res.status(200).json(currentMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current movies', error: error.message });
  }
};

export const getMoviesForTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params; // Extract theatre ID from URL params

    const movies = await Movie.find({ theatreId }); // Find movies by the theatre ID

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found for the specified theatre" });
    }

    res.status(200).json(movies); // Send movies as response
  } catch (error) {
    console.error("Error fetching movies for theatre:", error);
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};