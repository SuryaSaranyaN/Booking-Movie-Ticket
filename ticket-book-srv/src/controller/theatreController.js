import Theatre from '../model/theatreModel.js';

// Function to generate seats for each screen
// const generateSeats = (totalSeats) => {
//   const seats = [];
//   for (let i = 1; i <= totalSeats; i++) {
//     seats.push({ seat_no: `S${i}`, isBooked: false });
//   }
//   return seats;
// };

function generateSeats(rows, seatsPerRow) {
  const seats = [];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < rows; i++) {
    const rowLetter = alphabet[i].toUpperCase();
    for (let j = 1; j <= seatsPerRow; j++) {
      seats.push({
        seat_name: `${rowLetter}${j}`,
        isBooked: false,
      });
    }
  }

  return seats;
}



export const createTheatre = async (req, res) => {
  try {
    const { theatre_name, location, screen_details, show_times,amount } = req.body;

    if (!theatre_name || !location || !Array.isArray(screen_details)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const screens = screen_details.map((screen) => {
      const { screen_name, row_details } = screen;

      const rows = row_details.map((row) => {
        const { row_name, seat_count } = row;

        const seats = Array.from({ length: seat_count }, (_, index) => ({
          seat_number: `${row_name}${index + 1}`,
          isBooked: false,
        }));

        return { row_name, seats };
      });

      return { screen_name, rows };
    });

    const newTheatre = new Theatre({
      theatre_name,
      location,
      screens,
      amount,
      show_times,
    });

    const savedTheatre = await newTheatre.save();

    return res.status(201).json({
      message: 'Theatre created successfully',
      theatre: savedTheatre,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating theatre',
      error: error.message,
    });
  }
};


//Update Theatre

export const updateTheatre = async (req, res) => {
  try {
    const { theatre_id } = req.params;
    const { theatre_name, location, show_times, screen_details } = req.body;

    // Validate the input data
    if (!theatre_name || !location || !Array.isArray(screen_details)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Transform screen_details to match the schema's structure
    const screens = screen_details.map((screen) => {
      const { screen_name, row_details } = screen;
      const rows = row_details.map((row) => {
        const { row_name, seat_count } = row;
        const seats = generateSeat(row_name, seat_count);
        return { row_name, seats };
      });
      return { screen_name, rows };
    });

    // Update the theatre document
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      theatre_id,
      { theatre_name, location, show_times, screens,amount },
      { new: true }
    );

    if (!updatedTheatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    return res.status(200).json({
      message: 'Theatre updated successfully',
      updatedTheatre,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating theatre',
      error: error.message,
    });
  }
};

// Helper function to generate seats for a row
function generateSeat(row_name, seat_count) {
  const seats = [];
  for (let i = 1; i <= seat_count; i++) {
    seats.push({
      seat_number: `${row_name}${i}`,
      isBooked: false,
    });
  }
  return seats;
}

// Get one theatre
export const getOneTheatre = async (req, res) =>{
  try{
    const {theatre_id} = req.params;
    const theatre = await Theatre.findById(theatre_id);
    res.status(200).json(theatre);
  }catch(error){
    res.status(500).json({message:"Error fetching theatre",error:error.message});
  }
}

// Get all theatre
// export const getAllTheatres = async (req, res) => {
//   try {
//     const theatres = await Theatre.find();
//     res.status(200).json(theatres);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching theatres", error: error.message });
//   }
// }

// export const getAllTheatres = async (req, res) => {
//   try {
//     const theatres = await Theatre.find(); // Fetch all theatres

//     const theatresWithSeatCounts = theatres.map((theatre) => {
//       let totalSeats = 0;
//       let bookedSeats = 0;

//       theatre.screens.forEach((screen) => {
//         screen.rows.forEach((row) => {
//           totalSeats += row.seats.length; // Count all seats in the row
//           bookedSeats += row.seats.filter((seat) => seat.isBooked).length; // Count booked seats in the row
//         });
//       });

//       return {
//         _id: theatre._id,
//         theatre_name: theatre.theatre_name,
//         location: theatre.location,
//         screens: theatre.screens.map((screen) => screen.screen_name), // Optional: Return screen names
//         show_times: theatre.show_times,
//         totalSeats,
//         bookedSeats,
//       };
//     });

//     res.status(200).json(theatresWithSeatCounts);
//   } catch (error) {
//     console.error("Error fetching theatres:", error);
//     res.status(500).json({ message: "Error fetching theatres", error: error.message });
//   }
// };



export const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find(); // Fetch all theatres

    const theatresWithSeatCounts = theatres.map((theatre) => {
      let totalSeats = 0;
      let bookedSeats = 0;

      const screensWithSeatCounts = theatre.screens.map((screen) => {
        let screenTotalSeats = 0;
        let screenBookedSeats = 0;

        screen.rows.forEach((row) => {
          screenTotalSeats += row.seats.length; // Count all seats in the row for the screen
          screenBookedSeats += row.seats.filter((seat) => seat.isBooked).length; // Count booked seats in the row for the screen
        });

        // Update theatre-level counts
        totalSeats += screenTotalSeats;
        bookedSeats += screenBookedSeats;

        return {
          screen_name: screen.screen_name,
          totalSeats: screenTotalSeats,
          bookedSeats: screenBookedSeats,
        };
      });

      return {
        _id: theatre._id,
        theatre_name: theatre.theatre_name,
        location: theatre.location,
        amount: theatre.amount,
        screens: screensWithSeatCounts,
        show_times: theatre.show_times,
        totalSeats,
        bookedSeats,
      };
    });

    res.status(200).json(theatresWithSeatCounts);
  } catch (error) {
    console.error("Error fetching theatres:", error);
    res.status(500).json({ message: "Error fetching theatres", error: error.message });
  }
};


//Delete theatre
export const deleteTheatre = async (req, res) =>{
  try {
    const {theatre_id} = req.params;
    const deletedTheatre = await Theatre.findByIdAndDelete(theatre_id);
    res.status(200).json({message:`Theatre deleted successfully`,deletedTheatre});
  } catch (error) {
    res.status(500).json({message:"Error deleting theatre",error:error.message});
  }
}

//Location

// export const findTheatreByLocation = async (req, res) => {
//   console.log(req.params);
//   try {
//     const { location } = req.params; // Extract location from query parameters
//     const theatres = await Theatre.find({ location });
//     if (theatres.length === 0) {
//       return res.status(404).json({ message: "No theatres found for the specified location" });
//     }
//     res.status(200).json(theatres);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching theatres by location", error: error.message });
//   }
// };

export const findTheatreByLocation = async (req, res) => {
  console.log(req.params);
  try {
    const { location } = req.params; // Extract location from query parameters
    // Use a case-insensitive search
    const theatres = await Theatre.find({ location: { $regex: new RegExp(location, "i") } });
    if (theatres.length === 0) {
      return res.status(404).json({ message: "No theatres found for the specified location" });
    }
    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theatres by location", error: error.message });
  }
};





// get screen by theatre id
export const getScreensByTheatreId = async (req, res) => {
  try {
    const { theatre_id } = req.params; // Get theater ID from request parameters

    // Fetch the theater by ID
    const theatre = await Theatre.findById(theatre_id);

    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    // Extract and return the screens
    const screens = theatre.screens;

    return res.status(200).json({
      message: 'Screens fetched successfully',
      screens,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching screens by theatre ID',
      error: error.message,
    });
  }
};
  

//Theatre count

export const getTheatreCount = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    const theatreCount = theatres.length;
    return res.status(200).json({ message: 'Theatre count fetched successfully', theatreCount });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching theatre count', error: error.message });
  }
};