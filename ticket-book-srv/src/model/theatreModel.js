// import mongoose from 'mongoose';
// // import { v4 as uuidv4 } from 'uuid';


// const SeatSchema = new mongoose.Schema({
//   // _id: { type: String, default: uuidv4 },
//   seat_number: { type: String, required: true }, // e.g., 'A1', 'A2'
//   isBooked: { type: Boolean, default: false },
// });

// const RowSchema = new mongoose.Schema({
//   // _id: { type: String, default: uuidv4 },
//   row_name: { type: String, required: true }, // e.g., 'A', 'B'
//   seats: { type: [SeatSchema], required: true },
// });

// const ScreenSchema = new mongoose.Schema({
//   // _id: { type: String, default: uuidv4 },
//   screen_name: { type: String, required: true },
//   rows: { type: [RowSchema], required: true },
// });

// const TheatreSchema = new mongoose.Schema({
//   // _id: { type: String, default: uuidv4 },
//   theatre_name: { type: String, required: true },
//   location: { type: String, required: true },
//   screens: { type: [ScreenSchema], required: true },
//   show_times: { type: [String], required: false }, // e.g., ['10:00 AM', '1:00 PM']
// });

// const Theatre = mongoose.model('Theatre', TheatreSchema);
// const Screen = mongoose.model('Screen', ScreenSchema);

// export default {Theatre, Screen };





import mongoose from 'mongoose';

const SeatSchema = new mongoose.Schema({
  seat_number: { type: String, required: true }, // e.g., 'A1', 'A2'
  isBooked: { type: Boolean, default: false },
});

const RowSchema = new mongoose.Schema({
  row_name: { type: String }, // e.g., 'A', 'B'
  seats: { type: [SeatSchema] },
});

const ScreenSchema = new mongoose.Schema({
  screen_name: { type: String },
  rows: { type: [RowSchema]},
});

const TheatreSchema = new mongoose.Schema({
  theatre_name: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  screens: { type: [ScreenSchema], required: true },
  show_times: { type: [String], required: false }, // e.g., ['10:00 AM', '1:00 PM']
});

const Theatre = mongoose.models.Theatre || mongoose.model('Theatre', TheatreSchema);
// const Screen = mongoose.models.Screen || mongoose.model('Screen', ScreenSchema);

// Export models
// export { Theatre, Screen }; // Named export
// or
export default Theatre; 















// import mongoose from 'mongoose';

// // Define Seat schema (we can define it inline or in a separate file if required)
// const SeatSchema = new mongoose.Schema({
//   seat_name: { type: String, required: true }, 
//   seat_count: { type: String, required: true }, 
//   isBooked: { type: Boolean, default: false },
// });

// // Define Screen schema
// const ScreenSchema = new mongoose.Schema({
//   screen_name: { type: String, required: true },
//   seats_count: { type: [SeatSchema], required: true },
//   // current_movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: false },
// });

// // Define Theatre schema
// const TheatreSchema = new mongoose.Schema({
//   theatre_name: { type: String, required: true },
//   location: { type: String, required: true },
//   screens: { type: [SeatSchema], required: true }, // Array of screens
//   show_times: { type: [String], required: false },
// });

// const Theatre = mongoose.model('Theatre', TheatreSchema);

// export default Theatre;
