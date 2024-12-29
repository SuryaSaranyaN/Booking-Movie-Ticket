// import mongoose from 'mongoose';


// const BookingSchema = new mongoose.Schema({
//   user_id: { type: String, required: true },
//   movie_id: { type: String, required: true },
//   theatre_id: { type: String, required: true },
//   seat_number: { type: [String], required: true },
//   date: { type: Date, required: true },
//   time: { type: Date, required: true },
// });

// const Booking = mongoose.model('Booking', BookingSchema);
// export default Booking;

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  seats: [
    {
      row: { type: String, required: true }, // e.g., "A"
      seat_number: { type: String, required: true }, // e.g., "A1"
    },
  ],
  show_time: { type: String, required: true }, // e.g., "10:15 AM"
});
const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;

