import React from "react";
import "../style/header.css";
import { Link } from "react-router-dom";
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
      <div className="header">
       hello
      </div>
    </>
  );
}

export default Header;
