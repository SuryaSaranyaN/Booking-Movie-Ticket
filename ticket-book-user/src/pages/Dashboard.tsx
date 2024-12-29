// import React, { useState, useEffect } from 'react';
// import { getAllMovie } from '../api/api.services';
// import { Movie } from '../api/api.services';

// const UserDashboard: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch all movies
//     getAllMovie()
//       .then((response) => {
//         const allMovies = response.movies; // Ensure this matches your API response

//         if (Array.isArray(allMovies)) {
//           setMovies(allMovies);
//         } else {
//           setError('Unexpected response format.');
//         }
//       })
//       .catch((err) => {
//         setError('Failed to fetch movies.');
//         console.error('Error fetching movies:', err);
//       });
//   }, []);

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">User Dashboard - Movies</h1>

//       {movies.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {movies.map((movie) => (
//             <div
//               key={movie._id}
//               className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <img
//                 src={movie.imageUrl}
//                 alt={movie.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold mb-2">{movie.name}</h2>
//                 <p className="text-sm text-gray-700 mb-1">Genre: {movie.genre}</p>
//                 <p className="text-sm text-gray-700">Duration: {movie.duration} mins</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No movies available.</p>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;
