import React from "react";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";
import "./ViewTravelStory.css";

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  if (!storyInfo) return null;

  return (
    <div className="viewstory-container">

      <div className="viewstory-header">
        <div className="header-actions">
          <button
            className="btn-update"
            onClick={() => onEditClick(storyInfo)}
          >
            <MdUpdate className="btn-icon" />
            <span className="btn-text">UPDATE STORY</span>
          </button>

          <button
            className="btn-delete"
            onClick={() => onDeleteClick(storyInfo?._id)}
          >
            <MdDeleteOutline className="btn-icon" />
            <span className="btn-text">DELETE</span>
          </button>

          <button onClick={onClose} className="btn-close">
            <MdClose className="btn-close-icon" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="story-content">
        <h1 className="story-title">{storyInfo?.title || "No Title"}</h1>

        <div className="story-meta">
          <span className="story-date">
            {storyInfo?.visitedDate
              ? moment(storyInfo.visitedDate).format("Do MMM YYYY")
              : "No Date"}
          </span>

          <div className="story-location">
            <GrMapLocation className="location-icon" />
            {storyInfo?.visitedLocation?.length > 0 ? (
              storyInfo.visitedLocation.map((item, index) => (
                <span key={index}>
                  {item}
                  {index !== storyInfo.visitedLocation.length - 1 && ", "}
                </span>
              ))
            ) : (
              "No Location"
            )}
          </div>
        </div>
      </div>

      {/* Story Image */}
      <div className="story-image">
        {storyInfo?.imageUrl ? (
          <img src={storyInfo.imageUrl} alt="selected" />
        ) : (
          <p className="no-image">No Image Available</p>
        )}
      </div>

      {/* Story Description */}
      <div className="story-description">
        {storyInfo?.story ? (
          <p>{storyInfo.story}</p>
        ) : (
          <p className="no-story">No Story Available</p>
        )}
      </div>
    </div>
  );
};

export default ViewTravelStory;
