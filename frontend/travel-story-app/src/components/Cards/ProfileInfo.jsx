import React from "react";
import { getInitials } from "../../utils/helper";
import "./ProfileInfo.css"; 

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return <p className="profile-loading">Loading...</p>;
  }

  return (
    <div className="profile-container">
      {/* Profile Avatar */}
      <div className="profile-avatar">
        {getInitials(userInfo?.fullName || "G")}
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <p className="profile-name">
          {userInfo.fullName || "Guest"}
        </p>
        <button
          className="profile-logout"
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
