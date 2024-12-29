import { useState, useEffect } from 'react';
import { IMovie } from "../models/movieModel";
import { upCommingMovies, currentMoive } from '../api/api.services';


const HomePage = () => {
  const [currentMovies, setCurrentMovies] = useState<IMovie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    // Fetch current and upcoming movies from the API
    const fetchMovies = async () => {
      try {
        const current = await currentMoive();
        const upcoming = await upCommingMovies();

        setCurrentMovies(current);
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Home Page</h1> */}
      
      {/* Currently Running Movies */}
      <div className="mb-8">
        <h2 className="lg:text-3xl sm:text-xl  font-semibold text-center mb-4 ">Currently Running Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transform">
          {currentMovies.map((movie) => (
            <div key={movie._id} className="movie-card border p-4 rounded-lg shadow-lg  transition-all hover:scale-105 hover:shadow-xl">
              <img
                className="w-full h-56 object-cover rounded-md mb-4"
                src={`http://localhost:3000${movie.poster_url}`} 
                alt={movie.name}
              />
              <h3 className="text-lg font-semibold text-center mb-2">{movie.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Movies */}
      <div>
        <h2 className="lg:text-3xl sm:text-xl font-semibold mb-4 text-center">Upcoming Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {upcomingMovies.map((movie) => (
            <div key={movie._id} className="movie-card border p-4 rounded-lg shadow-lg relative transform transition-all hover:scale-105 hover:shadow-xl">
              <img
                className="w-full h-56 object-cover rounded-md mb-4"
                src={`http://localhost:3000${movie.poster_url}`} 
                alt={movie.name}
              />
              <h3 className="text-lg font-semibold text-center mb-3">{movie.name}</h3>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-1  px-3 text-xs rounded-lg">
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
