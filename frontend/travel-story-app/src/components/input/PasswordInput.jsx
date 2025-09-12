import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev); // cleaner toggle
  };

  return (
    <div className="flex items-center bg-cyan-600/5 px-3 rounded mb-3 border border-gray-200 focus-within:border-cyan-500 transition duration-200">
      {/* Password Field */}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-2 mr-3 rounded outline-none"
        type={isShowPassword ? "text" : "password"}
        aria-label="Password" // Accessibility improvement
      />

      {/* Toggle Password Visibility Button */}
      <button
        type="button"
        onClick={toggleShowPassword}
        className="focus:outline-none"
        aria-label={isShowPassword ? "Hide password" : "Show password"} // Accessibility improvement
      >
        {isShowPassword ? (
          <FaRegEye size={22} className="text-cyan-600 cursor-pointer" />
        ) : (
          <FaRegEyeSlash size={22} className="text-cyan-600 cursor-pointer" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
