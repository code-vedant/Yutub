import React from "react";
import "../style/header.css";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/search.png";
import rightArrow from "../assets/rightArrow.png";
import leftArrow from "../assets/leftArrow.png";
import userAuth from "../store/userAuth";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import user from "../assets/user.png";
import logo from "../assets/logo.png";
function Header({ toggleNavbar, isNavbarVisible }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navList = [
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
