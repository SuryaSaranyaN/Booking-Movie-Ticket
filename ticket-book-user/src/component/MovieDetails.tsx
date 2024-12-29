// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { IMovie } from "../pages/models/movieModel";
// import { getAllMovie } from "../api/api.services";

// const MovieDetailsPage: React.FC = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState<IMovie | null>(null);

//   useEffect(() => {
//     const getMovieDetails = async () => {
//       const data = await getAllMovie();
//       setMovie(data);
//     };

//     getMovieDetails();
//   }, [id]);

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl mb-4">{movie.name}</h1>
//       <p>{movie.synopsis}</p>
//       <div className="mt-4">
//       <strong>Cast: </strong> {Array.isArray(movie.cast) ? movie.cast.join(", ") : "N/A"}
//       </div>
//       <div>
//         <strong>Rating: </strong> {movie.rating}
//       </div>
//       <a href={movie.trailer_url} className="text-blue-500 hover:underline mt-4 block">Watch Trailer</a>
//     </div>
//   );
// };

// export default MovieDetailsPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../models/movieModel";
import { getAllMovie } from "../api/api.services";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await getAllMovie();
      // Find the movie by the ID from the API response
      const movieDetails = data.find((movie: IMovie) => movie._id === id);
      setMovie(movieDetails || null); // Ensure the movie details exist for the selected ID
    };

    getMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Movie Trailer */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Movie Trailer</h2>
        {movie.trailer_url ? (
          <video
            controls
            className="w-full h-[500px] object-cover mt-2"
            src={movie.trailer_url}
            title={`${movie.name} Trailer`}
          />
        ) : (
          <p>No trailer available.</p>
        )}
      </div>

      {/* Movie Details */}
      <h1 className="text-3xl mb-4">{movie.name}</h1>
      <p className="mb-4">{movie.synopsis}</p>
      
      <div className="mt-4">
        <strong>Cast: </strong>
        {Array.isArray(movie.cast) ? movie.cast.join(", ") : "N/A"}
      </div>
      <div>
        <strong>Rating: </strong> {movie.rating}/10
      </div>

      <a href={movie.trailer_url} className="text-blue-500 hover:underline mt-4 block">
        Watch Trailer
      </a>
    </div>
  );
};

export default MovieDetailsPage;
