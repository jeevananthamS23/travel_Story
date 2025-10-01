import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import "./FilterInfoTitle.css"; 

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  if (!filterType) return null;

  return (
    <div className="filter-info-container">
      {filterType === "search" ? (
        <h3 className="filter-info-heading">
          Search Results
        </h3>
      ) : (
        <div className="filter-info-flex">
          <h3 className="filter-info-heading">
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
    <div className="date-chip">
      <p className="date-chip-text">
        {startDate} - {endDate}
      </p>
      <button
        onClick={onClear}
        className="date-chip-button"
        aria-label="Clear filter"
      >
        <MdOutlineClose className="date-chip-icon" />
      </button>
    </div>
  );
};

export default FilterInfoTitle;
