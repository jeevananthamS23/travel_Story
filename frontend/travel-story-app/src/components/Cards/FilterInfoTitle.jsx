import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  if (!filterType) return null; // Prevent rendering if no filter applied

  return (
    <div className="mb-5 px-2">
      {filterType === "search" ? (
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
          Search Results
        </h3>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
            Travel Stories from
          </h3>
          <DateRangeChip date={filterDates} onClear={onClear} />
        </div>
      )}
    </div>
  );
};

const DateRangeChip = ({ date, onClear }) => {
  const startDate = date?.from ? moment(date.from).format("Do MMM YYYY") : "N/A";
  const endDate = date?.to ? moment(date.to).format("Do MMM YYYY") : "N/A";

  return (
    <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
      <p className="text-xs sm:text-sm font-medium text-slate-700">
        {startDate} - {endDate}
      </p>
      <button
        onClick={onClear}
        className="p-1 hover:bg-slate-200 rounded-full transition-colors"
        aria-label="Clear filter"
      >
        <MdOutlineClose className="text-slate-500 hover:text-slate-700 text-lg" />
      </button>
    </div>
  );
};

export default FilterInfoTitle;
