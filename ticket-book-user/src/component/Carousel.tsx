// import React, { useState, useEffect } from 'react';

// const Carousel = ({ movies }: { movies: { id: number; title: string; image: string }[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Function to move to the next slide
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === movies.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Function to move to the previous slide
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? movies.length - 1 : prevIndex - 1
//     );
//   };

//   // Auto slide change effect every 2 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return (
//     <div className="relative w-full h-[400px] mx-auto mt-6">
//       {/* Carousel Container */}
//       <div className="overflow-hidden w-full h-full">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {movies.map((movie) => (
//             <div key={movie.id} className="w-full flex-shrink-0 h-full">
//               <img
//                 // src={movie.image}
//                 src={`http://localhost:3000${movie.image_url}`} 

//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//               />
//               <h2 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded">
//                 {movie.title}
//               </h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
//       >
//         &#8249;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
//       >
//         &#8250;
//       </button>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {movies.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full cursor-pointer ${
//               index === currentIndex ? 'bg-white' : 'bg-gray-400'
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
