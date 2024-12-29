

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getShowsForTheatre } from "../api/api.services"; 
// import { ITheatre } from "../models/theatreModel";

// const TheatreList: React.FC = () => {
//   const { location } = useParams<{ location: string }>(); // Extract the location from the URL
//   const [theatres, setTheatres] = useState<ITheatre[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (location) {
//       setLoading(true);
//       getShowsForTheatre(location) // Call your API to fetch theatres by location
//         .then((data) => {
//           setTheatres(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching theatres:", error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [location]);

//   return (
//     <div>
//       <h1>Theatres in {location}</h1>
//       {loading ? (
//         <p>Loading theatres...</p>
//       ) : (
//         <div>
//           {theatres.length === 0 ? (
//             <p>No theatres found for this location.</p>
//           ) : (
//             theatres.map((theatre) => (
//             //   <div key={theatre.theatre_id}>
//              <div key={theatre._id as string}>
//                 <h2>{theatre.theatre_name}</h2>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TheatreList;


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { searchTheatres } from "../api/api.services";
import { ITheatre } from "../models/theatreModel";

const TheatreList: React.FC = () => {
  const { location } = useParams<{ location: string }>(); // Extract the location from the URL
  const [theatres, setTheatres] = useState<ITheatre[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setTheatres([]); 
      setLoading(true);
      searchTheatres(location) // Call your API to fetch theatres by location
        .then((data) => {
          const updatedTheatres = data.map((theatre: ITheatre) => ({
            ...theatre,
            theatre_name: theatre.theatre_name.toLowerCase(),
          }));
          setTheatres(updatedTheatres);
        })
        .catch((error) => {
          console.error("Error fetching theatres:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div className="container mx-auto p-4">
      {theatres.length > 0 ? (
      <h1 className="text-3xl font-bold mb-4">Theatres in {location}</h1>) : ''}
      {loading ? (
        <p>Loading theatres...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theatres.length === 0 ? (
        <p className="text-gray-600 text-lg text-center font-semibold">
          Sorry, we couldn't find any theatres in <span className="font-bold">{location}</span>. Please try searching for another location.
        </p>
      ) : (
            theatres.map((theatre) => (
              <div
                key={theatre._id as string}
                className="bg-white p-6 text-center rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <h2 className="lg:text-2xl font-semibold mb-2 text-center mb-3">{theatre.theatre_name} Theatre</h2>
                {/* <p className="text-gray-600 mb-4">{theatre.location}</p> */}
                <Link
                  to={`/theatre/${theatre._id}/movies`}
                  className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg"
                >
                  View Shows
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TheatreList;

