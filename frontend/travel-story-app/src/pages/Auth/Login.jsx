import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';



// it handle  logic of login page and it contain api intergation
const Login = () => {
    const navigate = useNavigate(); // it was used to naviagte between pages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   // it handel the data logic
    const [error, setError] = useState(null);


    // it contain 
    const handleLogic = async (e) => {
        e.preventDefault();   // it prevent the continuous render 
        setError(""); // Reset previous errors

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }


        // handle api intergation
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            // Handle successful login response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if((error.response && error.response.data && error.response.data.message)){
             setError(error.response.data.message);}
             else
             {
                setError("An unexpected error occured. please try again");
             }
            console.error("Login error:", error);
        }
    };

    return (
        <div className="h-screen bg-cyan-50 overflow-hidden relative">
         
            <div className="login-ui-box right-10 -top-40"/>       {/* top right design */}
            <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"/>    {/* top left design */}
            <div className="container h-screen flex items-center justify-center px-20 mx-auto">

                {/* // it include the login page image */}
                <div className="w-1/3 h-[85vh] flex items-end bg-login-bg-img bg-cover rounded-lg p-10 z-50">
                    <div>
                        <h4 className="text-5xl text-white font-semibold leading-[58px]">
                            Capture Your <br /> Journeys
                        </h4>
                        <p className="text-[15px] text-white leading-6 pr-7 mt-4">
                            Record your travel experiences and memories in your personal travel journal.
                        </p>
                    </div>
                </div>
                
                {/* it was a form css and logic */}
                <div className='w-1/3 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
                    <form onSubmit={handleLogic}>
                        <h4 className='text-2xl font-semibold mb-7'>Login</h4>

                        <input 
                            type="text" 
                            placeholder='Email' 
                            className='input-box' 
                            value={email}
                            onChange={({ target }) => setEmail(target.value)} 
                        />

                        <PasswordInput 
                            value={password}
                            onChange={({ target }) => setPassword(target.value)} 
                        />

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type='submit' className='btn-primary'> LOGIN </button>
                        <p className='text-xs text-slate-500 text-center my-4'>Or</p>
                        <button 
                            type="button" 
                            className='btn-primary btn-light' 
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
