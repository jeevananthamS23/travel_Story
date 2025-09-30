import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import './login.css'; // <-- Import new CSS

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
    <div className="login-page">
      {/* Decorative UI Boxes */}
      <div className="login-ui-box right-box" />
      <div className="login-ui-box bottom-box" />

      <div className="login-container">
        
        {/* Left Side: Image Section */}
        <div className="login-left">
          <div>
            <h4 className="login-title">Capture Your <br /> Journeys</h4>
            <p className="login-subtext">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="login-right">
          <form onSubmit={handleLogic} className="login-form">
            <h4 className="form-title">Login</h4>

            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {/* Error Message */}
            {error && <p className="error-text">{error}</p>}

            {/* Login Button */}
            <button type="submit" className="btn-primary">LOGIN</button>

            <p className="or-text">Or</p>

            {/* Sign Up Button */}
            <button
              type="button"
              className="btn-primary btn-light"
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
