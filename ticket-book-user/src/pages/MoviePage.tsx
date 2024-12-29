import React, { useState, useEffect } from "react";
import { getAllMovie } from "../api/api.services";
import { IMovie } from "../models/movieModel";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const data = await getAllMovie();
      setMovies(data.movies);
    };

    getMovies();
  }, []);

  return (
    <div className="p-4">
      <div className="mr-10 ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white p-4 shadow-lg rounded-lg mb-10 border-b border-gray-600/20"
          >
            {/* Movie Image */}
            <img
            //   src={`/movie-images/${movie.image_url}`}
              src={`http://localhost:3000${movie.image_url}`} 

              alt={movie.name}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            {/* Movie Details */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold">{movie.name}</h3>
              {/* <p className="text-sm text-gray-600 mt-2">{movie.synopsis}</p> */}
                     <Link
                        to={`/movie/${movie._id}`}
                        className="text-blue-500 hover:underline mt-2 block text-sm"
                      >
                        View Details
                      </Link>
              <button
                // onClick={() => alert(`Booking ticket for: ${movie.name}`)} // Replace with booking logic
                onClick={() => navigate('/')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Book Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
