import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShowsForTheatre } from "../api/api.services";

// Define the Show type
interface IShow {
  id: string;
  name: string;
  description: string;
  schedule: string;
}

const TheatreShows: React.FC = () => {
  const { theatreId } = useParams<{ theatreId: string }>();
  const [shows, setShows] = useState<IShow[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (theatreId) {
      setLoading(true);
      getShowsForTheatre(theatreId)
        .then((data) => {
          setShows(data);
        })
        .catch((error) => {
          console.error("Error fetching shows:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [theatreId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shows at Theatre</h1>

      {loading ? (
        <p>Loading shows...</p>
      ) : (
        <div>
          {shows.length === 0 ? (
            <p>No shows available for this theatre.</p>
          ) : (
            shows.map((show) => (
              <div key={show.id} className="mb-4 p-4 border rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <p>{show.description}</p>
                <p>{show.schedule}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TheatreShows;
