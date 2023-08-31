import React from "react";
import LogoWH from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={LogoWH} alt="Logo Wealth Health" />
        Wealth Health
      </Link>
    </div>
  );
};

export default Logo;
