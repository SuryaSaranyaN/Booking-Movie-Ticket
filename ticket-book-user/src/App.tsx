import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import LoginPage from './pages/Login';
import LoggedInComponent from './component/LoggedIn';
// import UpCommingMovie from "./pages/UpCommingMovie";
import MovieList from "./component/MovieList";
import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./component/MovieDetails";
import MoviePage from "./pages/MoviePage";
import TheatrePage from "./pages/TheatrePage";
import TheatreMovies from "./component/TheatreMovies";
import TheatreList from "./component/TheatreList";
// import SeatSelector from "./component/SeatSelector";


function App() {

  return (
    <>
     <Router>
      {/* <div className=" grid grid-cols-12 h-[100vh] overflow-hidden"> */}
      <div className=" overflow-hidden">
       <div className="col-span-2">
      <Navbar />

      </div>
        {/* <div className="col-span-10 overflow-y-scroll"> */}
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/dashboard" element={<LoggedInComponent />} /> 
            <Route path="/navbar" element={<Navbar />} /> 
            <Route path="/movie" element={<MoviePage />} /> 
            <Route path="/signup" element={<Signup />} /> 
            {/* <Route path="/admin/newmovies" element={<UpCommingMovie />} /> */}
            <Route path="/movie/movielist" element={<MovieList />} />
            <Route path="/movie/details" element={<MovieDetailsPage />} />
            <Route path="/theatre/:theatreId" element={<TheatrePage/>} />
            <Route path="/theatre/list/:location" element={<TheatreList />} />
            <Route path="/theatre" element={<TheatrePage/>} />
            <Route path="/theatre/:theatreId/movies" element={<TheatreMovies />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/home" element={<HomePage />} /> 
            <Route path="/theatermovies/:theatreId" element={<TheatreMovies />} />
            </Routes>
        {/* </div> */}
      </div>
    </Router>

    </>
  )
}

export default App
