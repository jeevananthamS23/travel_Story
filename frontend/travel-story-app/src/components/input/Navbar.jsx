import React, { useState } from "react";
import Logo from "/src/assets/images/logo.avif";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./SearchBar";
import { MdMenu, MdClose } from "react-icons/md";
import "./Navbar.css"; // ✅ Import CSS

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchStory,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        <img src={Logo} alt="Travel Story" className="navbar-logo-img" />
      </div>

      {isToken && (
        <>
          {/* Desktop Searchbar & Profile */}
          <div className="navbar-desktop">
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
            className="menu-btn md-hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <MdClose className="menu-icon" />
            ) : (
              <MdMenu className="menu-icon" />
            )}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="mobile-menu md-hidden">
              <Searchbar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
