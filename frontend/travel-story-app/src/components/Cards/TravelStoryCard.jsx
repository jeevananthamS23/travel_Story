import React from "react";
import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

const TravelStoryCard = ({
  imgUrl,
  title,
  visitedDate, // Ensure this prop is passed correctly
  story,
  visitedLocation = [], // Default to empty array to prevent errors
  isFavourite,
  onFavouriteClick,
  onClick
}) => {
  // Format the date correctly using Intl.DateTimeFormat()
  const formattedDate = visitedDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(visitedDate))
    : "-";

  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
        onClick={onClick}
      />

       <button className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4" 
       onClick={onFavouriteClick}>
        <FaHeart className={`${isFavourite ? "text-red-500" : "text-white"}`} />

        
        </button> 










      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{formattedDate}</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2">{story?.slice(0, 60)}</p>
        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          <span className="text-xs text-slate-500">
            {visitedLocation.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
