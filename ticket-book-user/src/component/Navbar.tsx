import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle the Enter key press
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission
    if (searchQuery.trim()) {
      navigate(`/theatre/list/${searchQuery}`); // Navigate to the theatres page with the search query
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="flex justify-between items-center p-4">
        {/* Brand Name */}
        <Link to="/" className="text-white font-serif font-bold">
          <span className="text-2xl sm:text-3xl lg:text-4xl block">Flim Fusion</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative ms-10 lg:w-1/2 mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Location..."
            className="w-80 py-2 px-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </form>

        {/* Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-gray-800 lg:static lg:w-auto lg:flex lg:items-center lg:space-x-4`}
        >
          <Link
            to="/home"
            className="text-white block text-center py-2 hover:bg-gray-700 lg:py-0 lg:inline"
          >
            Home
          </Link>
          <Link
            to="/movie"
            className="text-white block text-center py-2 hover:bg-gray-700 lg:py-0 lg:inline"
          >
            Movies
          </Link>

          {/* Profile Image */}
          <Link to="/profile" className="block lg:inline">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&w=150&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
