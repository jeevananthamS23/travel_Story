import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./PasswordInput.css"; 

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="password-input-container">
      {/* Password Field */}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="password-input-field"
        type={isShowPassword ? "text" : "password"}
        aria-label="Password"
      />

   
      <button
        type="button"
        onClick={toggleShowPassword}
        className="password-toggle-btn"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <FaRegEye size={22} className="password-icon" />
        ) : (
          <FaRegEyeSlash size={22} className="password-icon" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
