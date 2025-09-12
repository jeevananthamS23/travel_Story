import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return <p className="text-sm font-medium text-slate-500">Loading...</p>;
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Profile Avatar */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-semibold bg-slate-100 shadow-sm">
        {getInitials(userInfo?.fullName || "G")}
      </div>

      {/* Profile Info */}
      <div className="hidden sm:flex flex-col">
        <p className="text-sm sm:text-base font-medium text-slate-800 truncate max-w-[120px]">
          {userInfo.fullName || "Guest"}
        </p>
        <button
          className="text-xs sm:text-sm text-slate-600 hover:text-slate-800 underline transition-colors"
          onClick={onLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
