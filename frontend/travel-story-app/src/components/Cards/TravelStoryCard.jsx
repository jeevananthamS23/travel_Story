import React from "react";
import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import "./TravelStoryCard.css";   // ✅ Import CSS file

const TravelStoryCard = ({
  imgUrl,
  title = "Untitled Story",
  visitedDate,
  story = "No story available",
  visitedLocation = [],
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  const formattedDate = visitedDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(visitedDate))
    : "-";

  return (
    <div className="travel-card" onClick={onClick}>
      <img src={imgUrl} alt={title} />

      {/* Favorite Button */}
      <button
        className="fav-btn"
        aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.stopPropagation();
          onFavouriteClick();
        }}
      >
        <FaHeart className={`heart ${isFavourite ? "active" : ""}`} />
      </button>

      {/* Content */}
      <div className="travel-card-content">
        <div className="travel-card-header">
          <div className="flex-1">
            <h6>{title}</h6>
            <span>{formattedDate}</span>
          </div>
        </div>

        <p className="travel-card-story">
          {story.length > 60 ? `${story.slice(0, 60)}...` : story}
        </p>

        {visitedLocation.length > 0 && (
          <div className="location-tag">
            <GrMapLocation className="text-sm" />
            <span>{visitedLocation.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelStoryCard;
