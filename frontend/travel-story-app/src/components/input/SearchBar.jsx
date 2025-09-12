import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full max-w-sm flex items-center px-4 py-2 bg-slate-100 rounded-md border border-slate-200 focus-within:border-cyan-500 transition duration-200">
      
      {/* Search Icon */}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-cyan-600 mr-2"
        onClick={handleSearch}
        aria-label="Search"
        role="button"
      />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm bg-transparent outline-none placeholder-slate-400"
        value={value}
        onChange={onChange}
        aria-label="Search input"
      />

      {/* Clear Button (conditionally rendered) */}
      {value && (
        <IoMdClose
          className="text-lg text-slate-500 cursor-pointer hover:text-red-500 ml-2"
          onClick={onClearSearch}
          aria-label="Clear search"
          role="button"
        />
      )}
    </div>
  );
};

export default Searchbar;
