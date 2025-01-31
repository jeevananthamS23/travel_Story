import React from "react";
import Logo from "/src/assets/images/logo.avif";
import ProfileInfo from "../Cards/ProfileInfo";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = ({ userInfo }) => {
    const isToken =localStorage.getItem("token");
    const navigate=useNavigate();
    const onLogout=()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="travel story" className="h-20" />
{isToken   &&   <ProfileInfo userInfo={userInfo} onLogout={onLogout} /> }  {/*  Ensures userInfo is explicitly checked */}
    </div>
  );
};

export default Navbar;
