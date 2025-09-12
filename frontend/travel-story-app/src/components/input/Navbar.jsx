import React, { useState } from "react";
import Logo from "/src/assets/images/logo.avif";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./SearchBar";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchStory,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchStory(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <nav className="bg-white flex items-center justify-between px-4 sm:px-6 py-2 shadow-md sticky top-0 z-10">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src={Logo}
          alt="Travel Story"
          className="h-12 sm:h-16 md:h-20 w-auto transition-all duration-300"
        />
      </div>

      {isToken && (
        <>
          {/* Desktop Searchbar & Profile */}
          <div className="hidden md:flex items-center gap-4">
            <Searchbar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <MdClose className="text-2xl text-gray-700" />
            ) : (
              <MdMenu className="text-2xl text-gray-700" />
            )}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 
                         flex flex-col items-center gap-4 px-4 py-6 md:hidden animate-slide-down"
            >
              {/* Mobile Searchbar */}
              <Searchbar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />

              {/* Profile Section */}
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
