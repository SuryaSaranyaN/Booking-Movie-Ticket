import express from 'express';
import { upload } from '../middleware/middleware.js';
import { createMovie,updateMovie,getMovieById,getAllMovies,deleteMovie,getUpcomingMovies, getMovieCount, getCurrentMovies,getMoviesForTheatre } from '../controller/movieController.js';



const movieRoute = express.Router();

const app = express();
app.use(express.json());

// Movie routes
movieRoute.post('/create', upload, createMovie);       
movieRoute.put('/update/:id', upload, updateMovie); 
movieRoute.get('/getall', getAllMovies);    
movieRoute.get('/getone/:id', getMovieById);   
movieRoute.delete('/delete/:id', deleteMovie);
movieRoute.get('/count', getMovieCount);
movieRoute.get('/upcomingmovie', getUpcomingMovies);
movieRoute.get('/currentmovie', getCurrentMovies);
movieRoute.get('/theatre/:theatre_id', getMoviesForTheatre);

export default movieRoute;