import React, { useState } from "react"; // Added useState import
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false); //  Now useState works

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (  
        <div className="flex items-center bg-cyan-600/5 px-3 rounded mb-3">
            <input 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder || "Password"}
               
                className="w-full text-sm bg-transparent py-2 mr-3 rounded outline-none"
                type={isShowPassword ? "text" : "password"}
            />
            {isShowPassword ? (
                <FaRegEye     // eye icon in the login page
                    size={22} 
                    className="text-primary cursor-pointer" 
                    onClick={toggleShowPassword} 
                />
            ) : (
                <FaRegEyeSlash 
                    size={22} 
                    className="text-primary cursor-pointer" 
                    onClick={toggleShowPassword} 
                />
            )}
        </div>
    );
};

export default PasswordInput;
