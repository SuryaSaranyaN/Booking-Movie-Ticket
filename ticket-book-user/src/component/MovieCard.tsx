import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../models/movieModel";

const MovieCard: React.FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:opacity-80 border-b border-gray-600/20 pb-5">
         <img
        // src={`/movie-images/${movie.image_url}`} 
        src={`http://localhost:3000${movie.image_url}`} 

        alt={movie.name}
        className="w-[250px] h-[300px] object-cover rounded-t-lg"
      />

      <div className="mt-4 px-2 text-center">
        <h3 className="text-lg font-bold">{movie.name}</h3>
        {/* <p className="text-sm text-black/100">Genre: {movie.genre}</p> */}
        {/* <p className="text-sm text-black/50">
          Release Date: {new Date(movie.date).toLocaleDateString()}
        </p> */}
        {/* <p className="text-sm text-black/100">Rating: {movie.rating}/10</p>  */}
        <Link
          to={`/movie/${movie._id}`}
          className="text-blue-500 hover:underline mt-2 block text-sm"
        >
          View Details
        </Link> 
       
      </div>
    </div>
  );
};

export default MovieCard;
