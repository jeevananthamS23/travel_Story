import React from "react";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  if (!storyInfo) return null; // ✅ Prevents crashes if no data is passed

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {/* Header Buttons */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex flex-wrap items-center gap-2 bg-cyan-50/50 p-2 rounded-lg">
          <button
            className="btn-small flex items-center gap-1 text-sm px-3 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
            onClick={() => onEditClick(storyInfo)}
          >
            <MdUpdate className="text-lg" /> <span className="hidden sm:inline">UPDATE STORY</span>
          </button>

          <button
            className="btn-small btn-delete flex items-center gap-1 text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            onClick={() => onDeleteClick(storyInfo?._id)}
          >
            <MdDeleteOutline className="text-lg" /> <span className="hidden sm:inline">DELETE</span>
          </button>

          <button
            onClick={onClose}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="flex-1 flex flex-col gap-2 py-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-950 text-center md:text-left">
          {storyInfo?.title || "No Title"}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {storyInfo?.visitedDate
              ? moment(storyInfo.visitedDate).format("Do MMM YYYY")
              : "No Date"}
          </span>

          <div className="inline-flex flex-wrap items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
            <GrMapLocation className="text-sm" />
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
      <div className="w-full my-4">
        {storyInfo?.imageUrl ? (
          <img
            src={storyInfo.imageUrl}
            alt="selected"
            className="w-full max-h-[300px] sm:max-h-[400px] object-cover rounded-lg"
          />
        ) : (
          <p className="text-center text-gray-500">No Image Available</p>
        )}
      </div>

      {/* Story Description */}
      <div className="mt-4">
        {storyInfo?.story ? (
          <p className="text-sm md:text-base text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        ) : (
          <p className="text-center text-gray-500">No Story Available</p>
        )}
      </div>
    </div>
  );
};

export default ViewTravelStory;
