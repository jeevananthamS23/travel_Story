import React from "react";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  if (!storyInfo) return null; // ✅ Prevents crashes if no data is passed

  return (
    <div className="relative">
      {/* Header Buttons */}
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
            <button className="btn-small" onClick={() => onEditClick(storyInfo)}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={() => onDeleteClick(storyInfo?._id)}>
              <MdDeleteOutline className="text-lg" /> DELETE
            </button>

            <button onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">{storyInfo?.title || "No Title"}</h1>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo?.visitedDate
                ? moment(storyInfo.visitedDate).format("Do MMM YYYY")
                : "No Date"}
            </span>
            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              {storyInfo?.visitedLocation?.length > 0
                ? storyInfo.visitedLocation.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index !== storyInfo.visitedLocation.length - 1 && ", "}
                    </span>
                  ))
                : "No Location"}
            </div>
          </div>
        </div>
      </div>

      {/* Story Image */}
      {storyInfo?.imageUrl ? (
        <img
          src={storyInfo.imageUrl}
          alt="selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />
      ) : (
        <p className="text-center text-gray-500">No Image Available</p>
      )}

      {/* Story Description */}
      {storyInfo?.story ? (
        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No Story Available</p>
      )}
    </div>
  );
};

export default ViewTravelStory;
