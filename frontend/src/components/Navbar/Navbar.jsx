import "./Navbar.css";
import { assets } from "../../assets/assets";
import React, { useState } from "react";
const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  return (
    <div className="navbar">
      <img src={assets.nepal_logo} alt="" className="nepal_logo" />
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("Services")}
          className={menu === "Services" ? "active" : ""}
        >
          Services
        </li>
        <li
          onClick={() => setMenu("Notice")}
          className={menu === "Notice" ? "active" : ""}
        >
          Notice
        </li>
        <li
          onClick={() => setMenu("Contact-us")}
          className={menu === "Contact-us" ? "active" : ""}
        >
          Contact-us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
