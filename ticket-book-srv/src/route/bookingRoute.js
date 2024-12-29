import express from 'express';
import { createBooking } from '../controller/bookingController.js';

const bookingRoute = express.Router();

const app = express();
app.use(express.json());

// // Booking
bookingRoute.post('/create', createBooking);
// router.get('/user/getallbookings', getAllBookings);

export default bookingRoute;