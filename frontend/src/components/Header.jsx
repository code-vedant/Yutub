import React from "react";
import "../style/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import user from "../assets/user.png";
import logo from "../assets/logo.png";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // const authStatus = true
  const navList = [
    {
      name: "about",
      link: "/about",
      active: true,
    },
    {
      name: "login",
      link: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      link: "/signup",
      active: !authStatus,
    },
    
  ];

  return (
    <>
      <div className="header-main">
        <nav>
          <div className="HM-Links">
            <Link to="/" className="logo-link">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            </Link>
          </div>
          <ul className="headerList">
            {navList.map((navItem) =>
              navItem.active ? (
                <li key={navItem.name}>
                  <Link to={navItem.link}>{navItem.name}</Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <Link to="/profile">
                {" "}
                <div className="toProfile">
                  <img src={user} alt="" />
                </div>{" "}
              </Link>
            )}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
