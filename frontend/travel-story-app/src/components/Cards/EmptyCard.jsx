import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
      {/* Empty State Image */}
      <img 
        src={imgSrc} 
        alt="Empty state" 
        className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain" 
      />

      {/* Message */}
      <p className="max-w-md text-sm sm:text-base font-medium text-slate-700 leading-6 mt-4">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
