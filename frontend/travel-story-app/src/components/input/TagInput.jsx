import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  // Add new tag
  const addNewTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "" && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add tag on pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addNewTag();
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full max-w-md">
      {/* Display existing tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full shadow-sm"
            >
              <GrMapLocation className="text-sm" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-slate-500 hover:text-red-500 transition"
                aria-label={`Remove ${tag}`}
              >
                <MdClose className="text-lg" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + Add button */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          value={inputValue}
          className="flex-1 text-sm border border-cyan-300 px-3 py-2 rounded outline-none focus:border-cyan-500 transition"
          placeholder="Add location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Location input"
        />
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition"
          onClick={addNewTag}
          aria-label="Add location"
        >
          <MdAdd className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
