import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddTheatre from "./pages/Theatre/AddTheatre";
import TheatreTable from "./pages/Theatre/TheatreTable";
// import AddMovie from "./pages/Movie/AddMovie";
import MovieTable from "./pages/Movie/MovieTable";
import AddMovie from "./pages/Movie/AddMovie";
import AdminDashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className=" grid grid-cols-12 h-[100vh] overflow-hidden">
       <div className="col-span-2">
      <Sidebar />

      </div>
        <div className="col-span-10 overflow-y-scroll">
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/theatre/manage-theatre" element={<TheatreTable/>} />
            <Route path="/theatre/add-theatre" element={<AddTheatre />} /> 
            <Route path="/edit-theatre/:theatre_id" element={<AddTheatre />} /> 
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
            <Route path="/movie/manage-movies" element={<MovieTable />} />
            <Route path="/moive/add-movies" element={<AddMovie />} /> 
            <Route path="/movie/edit-movies/:movieId" element={<AddMovie />} />
            <Route path="/admin/analytics" element={<div>Analytics Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
