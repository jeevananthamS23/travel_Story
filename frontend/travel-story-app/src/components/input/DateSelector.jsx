import React, { useState } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import "./DateSelector.css";  

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div className="date-selector">
      {/* Date Button */}
      <button className="date-btn" onClick={() => setOpenDatePicker(true)}>
        <MdOutlineDateRange className="icon" />
        {date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY")}
      </button>

      {/* Date Picker Modal */}
      {openDatePicker && (
        <div className="date-picker-overlay">
          <div className="date-picker-modal">
            {/* Close Button */}
            <button className="close-btn" onClick={() => setOpenDatePicker(false)}>
              <MdClose className="icon" />
            </button>

            {/* Calendar */}
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={setDate}
              pagedNavigation
              className="date-picker-calendar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
