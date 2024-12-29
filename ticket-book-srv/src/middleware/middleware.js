import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url'; 

 const app = express();
app.use(express.json());

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'trailer_url') {
      cb(null, "public/trailers");  
    } else if (file.fieldname === 'poster_url') {
      cb(null, "public/movie-images");  
    }
  
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// Initialize multer with the storage configuration
export const upload = multer({ storage }).fields([{ name: 'trailer_url'}, { name: 'poster_url'}]);

