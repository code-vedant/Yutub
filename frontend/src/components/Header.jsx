import React from "react";
import "../style/header.css";
import { Link } from "react-router-dom";
function Header() {
  const navList = [
    {
      name: "login",
      link: "/login",
    },
    {
      name: "signup",
      link: "/signup",
    },
  ];
  return (
    <div className="main">
      <nav>
        <div className="logo">
          <h3>VideoTube</h3>
        </div>
        <div className="searchContainer">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <ul>
          {navList.map((navItem) => (
            <li key={navItem.name}>
            <Link to={navItem.link}>{navItem.name}</Link>
          </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
