
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, deleteMovie, getTheatreById } from "../../api/apiService";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";

const MovieTable = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theatreName, setTheatreName] = useState<string>('');
  const movieId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies(); // Fetch movies
        console.log("Fetched movies:", data); // Check the full response

        // Assuming the API response contains movies directly (not inside 'data.movies')
        // Ensure movies is always an array
        if (Array.isArray(data)) {
          setMovies(data); // If the response is already an array
        } else if (data && data.movies && Array.isArray(data.movies)) {
          setMovies(data.movies); // If the response has a 'movies' key
        } else {
          setMovies([]); // Empty array in case of an unexpected format
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // Set empty array in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (confirmDelete) {
      try {
        await deleteMovie(movieId);
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  const handleView = async (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    try {
      const theatreData = await getTheatreById(movie.theatre_id);
      setTheatreName(theatreData.name); // Set the theatre name in state
    } catch (error) {
      console.error("Error fetching theatre data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleEdit = (movieId: string) => {
    navigate(`/movie/edit-movies/${movieId}`);
  };

  const handleAddMovie = () => {
    navigate("/moive/add-movies");
  };

  return (
    <div className="mt-10 mx-auto p-4 shadow-lg rounded-lg bg-white max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Movie Details</h2>
        <button
          onClick={handleAddMovie}
          className="bg-gray-800 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-gray-900"
        >
          Add Movie
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-800 text-center">
                <th className="border border-gray-300 text-white px-4 py-2">S. NO</th>
                <th className="border border-gray-300 text-white px-4 py-2">Movie Name</th>
                <th className="border border-gray-300 text-white px-4 py-2">Genre</th>
                <th className="border border-gray-300 text-white px-4 py-2">Duration</th>
                <th className="border border-gray-300 text-white px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.map((movie, index) => {
                  return (
                    <tr key={movie._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{movie.name}</td>
                      <td className="border px-4 py-2">{movie.genre}</td>
                      <td className="border px-4 py-2">{movie.duration}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center me-4">
                      <button
                          onClick={() => handleView(movie)}
                          className="mr-2 text-blue-600 me-3 hover:text-blue-800"
                          >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(movie._id)}
                          className="mr-2 text-green-600 me-3 hover:text-green-800"
                          >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          className="text-red-600 hover:text-red-800"
                          >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No movies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Viewing Movie Details */}
      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">Movie Details</h3>
            <p><strong>Name:</strong> {selectedMovie.name}</p>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <p><strong>Duration:</strong> {selectedMovie.duration}</p>
            {/* <p><strong>Theatre:</strong> {theatreName}</p>
            <p><strong>Amount:</strong> {selectedMovie.amount || "Not available"}</p> */}

            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              <FaTimes size={20} /> {/* Close icon */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTable;
