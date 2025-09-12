import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);

  const handleLogic = async (e) => {
    e.preventDefault(); 
    setError(""); 

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      {/* Decorative UI Boxes - Hidden on small screens */}
      <div className="login-ui-box right-10 -top-40 hidden md:block" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2 hidden md:block" />

      <div className="container h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20 mx-auto">
        
        {/* Left Side: Image Section */}
        <div className="w-full md:w-1/3 h-[40vh] md:h-[85vh] flex items-end bg-login-bg-img bg-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-6 md:p-10 z-50">
          <div>
            <h4 className="text-3xl md:text-5xl text-white font-semibold leading-snug md:leading-[58px]">
              Capture Your <br /> Journeys
            </h4>
            <p className="text-sm md:text-[15px] text-white leading-6 mt-4 pr-0 md:pr-7">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/3 h-[60vh] md:h-[75vh] bg-white rounded-b-lg md:rounded-r-lg relative p-6 md:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleLogic} className="flex flex-col">
            <h4 className="text-xl md:text-2xl font-semibold mb-5 md:mb-7 text-center md:text-left">
              Login
            </h4>

            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box mb-3 w-full"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="btn-primary w-full text-sm md:text-base mt-2"
            >
              LOGIN
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            {/* Sign Up Button */}
            <button
              type="button"
              className="btn-primary btn-light w-full text-sm md:text-base"
              onClick={() => navigate("/signUp")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
