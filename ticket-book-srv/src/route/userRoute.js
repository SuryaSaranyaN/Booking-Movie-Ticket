import express from 'express';



const movieRoute = express.Router();

const app = express();
app.use(express.json());

// Auth routes
// router.post('/user/auth/signup', signup);
// router.post('/user/auth/login', login);

export default movieRoute;