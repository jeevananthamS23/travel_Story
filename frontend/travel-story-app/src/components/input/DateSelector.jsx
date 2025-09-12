import React, { useState } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div className="relative w-full">
      {/* Date Button */}
      <button
        className="inline-flex items-center gap-2 text-sm sm:text-[13px] font-medium 
                   text-sky-600 bg-sky-200/40 hover:bg-sky-200/70 
                   rounded px-3 py-2 sm:px-2 sm:py-1 cursor-pointer transition"
        onClick={() => setOpenDatePicker(true)} // Open the date picker
      >
        <MdOutlineDateRange className="text-lg" />
        {date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY")}
      </button>

      {/* Date Picker Modal */}
      {openDatePicker && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4"
        >
          <div
            className="relative w-full max-w-md bg-sky-50 rounded-lg shadow-lg 
                       p-5 sm:p-6 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center
                         rounded-full bg-sky-100 hover:bg-sky-200 transition"
              onClick={() => setOpenDatePicker(false)} // Close the date picker
            >
              <MdClose className="text-xl text-sky-600" />
            </button>

            {/* Calendar */}
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={setDate}
              pagedNavigation
              className="mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
