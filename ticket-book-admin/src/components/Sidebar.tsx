import  { useState } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 

  // Function to close sidebar
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="lg:hidden p-2 text-gray-800 text-2xl fixed z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"} 
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={closeSidebar} 
        ></div>
      )}
        <div
        className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-28 sm:w-56 md:w-64 lg:w-60 bg-gray-800 text-white h-screen p-5 fixed lg:relative z-50 transition-transform duration-300 ease-in-out`}
        >

        <h2 className="text-base md:text-sm lg:text-lg font-bold mb-6">
          Admin Menu
        </h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/admin/dashboard"
              className="text-sm md:text-xs lg:text-base hover:text-blue-400"
            >
              Dashboard
            </Link>
          </li>
   
          <li className="mb-4">
            <Link
              to="/theatre/manage-theatre"
              className="text-sm md:text-xs lg:text-base hover:text-blue-400"
            >
             Manage Theatre 
            </Link>
          </li>
          
          <li className="mb-4">
            <Link
              to="/movie/manage-movies"
              className="text-sm md:text-xs lg:text-base hover:text-blue-400"
            >
               Movie Management
            </Link>
          </li>
        
         
          <li className="mb-4">
            <Link
              to="/admin/analytics"
              className="text-sm md:text-xs lg:text-base hover:text-blue-400"
            >
              Booking Analytics
            </Link>
          </li>
          
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
