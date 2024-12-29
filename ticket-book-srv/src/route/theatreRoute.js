import express from 'express';
import { createTheatre,getOneTheatre,getAllTheatres,findTheatreByLocation,deleteTheatre,updateTheatre,getScreensByTheatreId, getTheatreCount } from '../controller/theatreController.js';

const app = express();
app.use(express.json());


const theatreRoute = express.Router();

theatreRoute.post('/create', createTheatre);
theatreRoute.get('/getall', getAllTheatres);
theatreRoute.get('/getone/:theatre_id', getOneTheatre);
theatreRoute.put('/update/:theatre_id', updateTheatre);
theatreRoute.delete('/delete/:theatre_id', deleteTheatre);
theatreRoute.get('/count', getTheatreCount);
theatreRoute.get('/location/:location', findTheatreByLocation);
theatreRoute.get('/getscreen/:theatre_id', getScreensByTheatreId);

export default theatreRoute;