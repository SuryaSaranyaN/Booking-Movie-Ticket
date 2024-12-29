
import Theatre from "../model/theatreModel.js";
import Booking from "../model/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const { user_id, movie_id, theatre_id, screen_id, seats, show_time } = req.body;

    // 1. Validate Theatre
    const theatre = await Theatre.findById(theatre_id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    // 2. Validate Screen
    const screen = theatre.screens.id(screen_id);
    if (!screen) {
      return res.status(404).json({ message: 'Screen not found in the selected theatre' });
    }

    // 3. Check Seats Availability
    const unavailableSeats = [];
    seats.forEach(({ row, seat_number }) => {
      const selectedRow = screen.rows.find(r => r.row_name === row);
      if (selectedRow) {
        const seat = selectedRow.seats.find(s => s.seat_number === seat_number);
        if (seat && seat.isBooked) {
          console.log(seat)

          unavailableSeats.push(seat_number);
        }
      }

    });


    if (unavailableSeats.length > 0) {
      return res.status(400).json({ message: 'Some seats are already booked', unavailableSeats });
    }

    // 4. Mark Seats as Booked
    seats.forEach(({ row, seat_number }) => {
      const selectedRow = screen.rows.find(r => r.row_name === row);
      if (selectedRow) {
        const seat = selectedRow.seats.find(s => s.seat_number === seat_number);
        if (seat) {
          seat.isBooked = true;
        }
      }
    });

    await theatre.save();

    // 5. Create Booking Record
    const booking = await Booking.create({
      user_id,
      movie_id,
      theatre_id,
      screen_id,
      seats,
      show_time,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};
