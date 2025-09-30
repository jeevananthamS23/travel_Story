import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import "./TagInput.css"; // ✅ Import CSS

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
    <div className="taginput-container">
      {/* Display existing tags */}
      {tags.length > 0 && (
        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              <GrMapLocation className="tag-icon" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="tag-remove-btn"
                aria-label={`Remove ${tag}`}
              >
                <MdClose className="tag-remove-icon" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + Add button */}
      <div className="tag-input-row">
        <input
          type="text"
          value={inputValue}
          className="tag-input"
          placeholder="Add location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Location input"
        />
        <button
          type="button"
          className="tag-add-btn"
          onClick={addNewTag}
          aria-label="Add location"
        >
          <MdAdd className="tag-add-icon" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
