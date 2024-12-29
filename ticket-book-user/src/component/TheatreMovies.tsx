import React, { useEffect, useState } from 'react';
import { getShowsForTheatre } from '../api/api.services';
import { Link, useParams } from 'react-router-dom';
import { ITheatre } from '../models/theatreModel';

const TheatreMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  
  // Destructure theatreId from useParams()
  const { theatreId } = useParams(); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (!theatreId) {
        setError('Theatre ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const data = await getShowsForTheatre(theatreId); 
        setMovies(data.movies || []);  
        console.log(data);
      } catch (error) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [theatreId]); 

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Shows at Theatre */}
      <h1 className="text-3xl font-bold text-center mt-10 mb-4">Shows at Theatre {theatreId}</h1>
      
      {loading ? (
        <p>Loading shows...</p>
      ) : (
        <div className="mr-10 mt-10 mb-10 ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.length === 0 ? (
            <p>No shows available for this theatre.</p>
          ) : (
            movies.map((movie) => (
              <div key={movie._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  // Assuming you have a valid image URL
                  src={`http://localhost:3000${movie.image_url}`}
                  alt={movie.name}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold">{movie.name}</h3>
                  <p className="text-gray-600">{movie.genre}</p>
                  <Link
                    to={`/movie/${movie._id}`}
                    className="text-blue-600 hover:underline mt-2 block text-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
  
};

export default TheatreMovies;
