// import React, { useState, useEffect } from 'react';
// import { upCommingMovies } from '../api/api.services';

// interface Movie {
//   duration: number;
//   _id: string;
//   name: string;
//   image_url: string;
//   genre: string;
//   date: string;
// }

// const UpcomingMovies: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setLoading(true);
//         const response = await upCommingMovies(); // Fetch movies from the API

//         if (response && Array.isArray(response.movies)) {
//           setMovies(response.movies); // Directly set the movies from the API
//         } else {
//           setError('Unexpected response format from API.');
//         }
//       } catch (err) {
//         setError('Error fetching movies. Please try again later.');
//         console.error('Error fetching movies:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading upcoming movies...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       {movies.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {movies.map((movie) => (
//             <div key={movie._id} className="shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={movie.image_url}
//                 alt={movie.name}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-4">
//                 <p className="text-lg font-semibold text-center">{movie.name}</p>
//                 <p className="text-center text-sm text-gray-500">{movie.genre}</p>
//                 <p className="text-center text-xs text-gray-400">
//                   Release Date: {new Date(movie.date).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No upcoming movies found.</p>
//       )}
//     </div>
//   );
// };

// export default UpcomingMovies;
