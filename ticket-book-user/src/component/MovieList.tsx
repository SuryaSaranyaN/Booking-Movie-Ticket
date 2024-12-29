import React, { useEffect, useState } from "react";
import { getAllMovie, upCommingMovies } from "../api/api.services";
import MovieCard from "./MovieCard";
import { IMovie } from "../models/movieModel";

const MovieList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await upCommingMovies();
        setMovies(movieData); // Ensure movieData matches the structure of the Movie model
      } catch (error) {
        setError("Failed to load movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mt-5 pb-20">
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
