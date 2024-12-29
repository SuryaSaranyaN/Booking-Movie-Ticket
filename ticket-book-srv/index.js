import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import theatreRoute from './src/route/theatreRoute.js';
import movieRoute from './src/route/movieRoute.js';
import userRoute from './src/route/userRoute.js';
import bookingRoute from './src/route/bookingRoute.js';
import path from 'path';

dotenv.config();
const app = express();
// app.use(express.json());  


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static( "public")); 

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public', 'trailers')));

const PORT= process.env.PORT || 6000;
const MONGO_URL = process.env.MONGO_URL || "";

if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables.");
}

// Connect to MongoDB
mongoose
  // .connect(MONGO_URL)
  // .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(MONGO_URL)

  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection failed:", error));

// Use routes
app.use('/api/theatre', theatreRoute);
app.use('/api/movie', movieRoute);
app.use('/api/user', userRoute);
app.use('/api/booking', bookingRoute);
