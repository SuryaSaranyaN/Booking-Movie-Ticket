import React, { useEffect, useState } from 'react';
import { getAllTheatre } from '../api/api.services';
import { useNavigate } from 'react-router-dom';

const TheatrePage = () => {
  const [theatres, setTheatres] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Fetch all theatres from the API
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const data = await getAllTheatre();
        setTheatres(data.theatres);
      } catch (error) {
        setError('Failed to load theatres');
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  // Loading and error states
  if (loading) {
    return <div>Loading theatres...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleTheatreClick = (theatreId: string) => {
    navigate(`/theatermovies/${theatreId}`);
  };

  return (
  
     <div className="mr-10 mt-10 ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {theatres.map((theatre) => (
              <div
                key={theatre._id}
                className="bg-white p-4 shadow-lg rounded-lg mb-10 border-b border-gray-600/20"
                onClick={() => handleTheatreClick(theatre._id)}
             >
                {/* Movie Image */}
                <img
                //   src={`/movie-images/${movie.image_url}`}
            src={`http://localhost:3000${theatre.theatre_image}`} 
    
                  alt={theatre.name}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {/* Movie Details */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold">{theatre.name}</h3>
               
                </div>
              </div>
            ))}
          </div>
  );
};

export default TheatrePage;
