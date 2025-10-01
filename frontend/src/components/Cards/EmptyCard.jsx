import React from "react";
import "./EmptyCard.css"; 

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="empty-card-container">
      {/* Empty State Image */}
      <img 
        src={imgSrc} 
        alt="Empty state" 
        className="empty-card-image" 
      />

      {/* Message */}
      <p className="empty-card-message">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
