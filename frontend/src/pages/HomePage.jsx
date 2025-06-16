import React, { useEffect, useState } from "react";
import "../style/homepage.css";
import { useSelector } from "react-redux";
import LandingPage from "./LandingPage.jsx"
import Header from "../components/HomePage/Header.jsx";
import { Outlet } from "react-router-dom";
import VideoBox from "../components/VideoBox.jsx";
import VideoPage from "../components/HomePage/VideoPage.jsx";

const HomePage = () => {
  const authStatus = useSelector((state => state.auth.status))


  return (
    <>
      {authStatus && (
          <section className="yutub-home">
            <header>
              <Header />
            </header>
              <Outlet />
              <VideoPage/>
          </section>
      )}
      {!authStatus && (
       <LandingPage />
      )}
    </>
  );
};

export default HomePage;
