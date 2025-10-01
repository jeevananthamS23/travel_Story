import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import "./Searchbar.css"; 

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="searchbar-container">
      {/* Search Icon */}
      <FaMagnifyingGlass
        className="searchbar-icon"
        onClick={handleSearch}
        aria-label="Search"
        role="button"
      />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        className="searchbar-input"
        value={value}
        onChange={onChange}
        aria-label="Search input"
      />

      {/* Clear Button (conditionally rendered) */}
      {value && (
        <IoMdClose
          className="searchbar-clear"
          onClick={onClearSearch}
          aria-label="Clear search"
          role="button"
        />
      )}
    </div>
  );
};

export default Searchbar;
