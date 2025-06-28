import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../style/auth.css";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import testimonials from "../constants/testimonial.json"
import InfiniteMarquee from "../components/animated/InfiniteMarquee.jsx";

function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <div className="auth-main">
        <div className="auth-back-test">
          <div className="auth-back-blur-glass"></div>

          <InfiniteMarquee direction={"top"} items={testimonials} />
          <InfiniteMarquee direction={"bottom"} items={testimonials} />
          <InfiniteMarquee direction={"top"} items={testimonials} />
          <InfiniteMarquee direction={"bottom"} items={testimonials} />
        </div>
        
        <Outlet context={{ isLoading, setIsLoading }} />
      </div>
    </>
  );
}

export default Auth;