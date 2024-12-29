import mongoose from 'mongoose';


const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true }, 
  cast: { type: [String], required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  trailer_url: { type: String, required: false },
  poster_url: { type: String, required: false },
  theatre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true }, 
  screen_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre.screens', required: true }, 
  date: { type: Date},
  release_date: { type: Date},
  description: { type: String},
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;
