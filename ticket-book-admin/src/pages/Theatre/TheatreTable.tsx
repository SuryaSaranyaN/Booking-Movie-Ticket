

import { useEffect, useState } from "react";
import { getTheatres, deleteTheatre } from "../../api/apiService";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Screen {
  // screen_no: string;
  screen_name:string;
  amount:string;
  totalSeats: number;
  bookedSeats: number;
  showTimes: string[];
}

interface Theatre {
  theatre_name: string;
  id: string;
  location: string;
  screens: Screen[];
}

const TheatreTable = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);

  const navigate = useNavigate();



  useEffect(() => {
    const fetchTheatres = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getTheatres(); // Fetch the API response
        console.log("API Response:", data);
  
        if (Array.isArray(data)) {
          const formattedData = data.map((theatre: any) => ({
            id: theatre._id,
            theatre_name: theatre.theatre_name,
            location: theatre.location,
            amount: theatre.amount,
            screens: theatre.screens?.map((screen: any) => ({
              screen_name: screen.screen_name,
              totalSeats: screen.totalSeats || 0,
              bookedSeats: screen.bookedSeats || 0,
            }
          
          )) || [],
          }));

          setTheatres(formattedData);
        } else {
          throw new Error("Theatre data is missing or invalid.");
        }
      } catch (err: any) {
        console.error("Failed to fetch theatres:", err.message);
        setError("Failed to fetch theatres. Please check the API response and try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTheatres();
  }, []);
  

  const handleDelete = async (theatreId: string) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this theatre?");
      if (confirmation) {
        await deleteTheatre(theatreId);
        setTheatres((prevTheatres) =>
          prevTheatres.filter((theatre) => theatre.id !== theatreId)
        );
      }
    } catch (err) {
      console.error("Failed to delete theatre:", err);
      setError("Failed to delete theatre. Please try again.");
    }
  };

  const handleEdit = (theatreId: string,theatre:any) => {
    navigate(`/edit-theatre/${theatreId}`,{state:{theatre}});

  };

  const handleView = (theatreId: string) => {
    const theatre = theatres.find((theatre) => theatre.id === theatreId);
    if (theatre) {
      console.log("Selected Theatre:", theatre); // Debugging log

      setSelectedTheatre(theatre);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };
  

  return (
    <div>
      <div className="mt-10 mx-auto p-4 shadow-lg rounded-lg bg-white max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Theatre Details</h2>
          <button
            onClick={() => navigate("/theatre/add-theatre")}
            className="bg-gray-800 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-gray-900"
          >
            Add Theatre
          </button>
        </div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-800 text-center">
                  <th className="border border-gray-300 text-white px-4 py-2">S. No</th>
                  <th className="border border-gray-300 text-white px-4 py-2">Theatre Name</th>
                  <th className="border border-gray-300 text-white px-4 py-2">Location</th>
                  {/* <th className="border border-gray-300 text-white px-4 py-2">Total Seats</th>
                  <th className="border border-gray-300 text-white px-4 py-2">Booked Seats</th> */}
                  <th className="border border-gray-300 text-white px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {theatres.length > 0 ? (
                  theatres.map((theatre, index) => {
                    // const { totalSeats, bookedSeats } = calculateTotals(theatre.screens);
                    return (
                      <tr key={theatre.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{theatre.theatre_name}</td>
                        <td className="border border-gray-300 px-4 py-2">{theatre.location}</td>
                        {/* <td className="border border-gray-300 px-4 py-2 text-center">{totalSeats}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{bookedSeats}</td> */}
                        <td className="border border-gray-300 px-4 py-2 text-center me-4">
                          <button
                            onClick={() => handleView(theatre.id)}
                            className="mr-2 text-blue-600 me-3 hover:text-blue-800"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(theatre.id,theatre)}
                            className="mr-2 text-green-600 me-3 hover:text-green-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(theatre.id)}
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
                      colSpan={6}
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No theatres available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTheatre && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
      <h3 className="text-lg font-bold mb-4">Theatre Details</h3>
      <p><strong>Name:</strong> {selectedTheatre.theatre_name}</p>
      <p><strong>Location:</strong> {selectedTheatre.location}</p>
      {/* <h4 className="mt-4">Screens:</h4> */}
      <table className="min-w-full mt-3 border-collapse">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-300 px-2 py-1 text-left">Screen Name</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Total Seats</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Booked Seats</th>
          </tr>
        </thead>
        <tbody>
          {selectedTheatre.screens.map((screen, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-1">{screen.screen_name}</td>
              <td className="border border-gray-300 px-2 py-1">{screen.totalSeats}</td>
              <td className="border border-gray-300 px-2 py-1">{screen.bookedSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
      >
        <FaTimes size={20} />
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default TheatreTable;
