import React, { useEffect, useState } from "react";
import VideoContainer from "../components/VideoContainer.jsx";
import VideoService from "../Service/video.js";
import logoNoText from "../assets/logoNoText.png";
import { Link } from "react-router-dom";
import "../style/homepage.css";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import PopupHolder from "../components/PopupHolder.jsx";
const HomePage = () => {
  const [videos, setVideos] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authStatus = useSelector((state) => state.auth.status)
  const [loading, setLoading] = useState(false);


  const fetchVideos = async () => {
    setLoading(true)
    try {
      const res = await VideoService.getAllVideos(accessToken);
      const { docs } = res.data;
      setVideos(docs);
    } catch (error) {
      console.log("Error fetching videos:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [accessToken]);

  // console.log("Videos:", videos);

  return (
    <>
    {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
    {authStatus && <div className="youtube-homepage">
      {Array.isArray(videos) && videos.map((video,index) => (
        <div key={video._id} className="vidcont">
          <VideoContainer  video={video} />
          
        </div>
      ))}
    </div>}
    {!authStatus && <section className="home-section">
      <div className="home-section-left">
      <h1>Welcome to Yutub</h1>
      <p>Discover, share, and stream your favorite videos.</p>
      <p>Join us today to start your journey!</p>
      <div className="home-actions">
        <Link to={"/signup"}>
        <button className="signup-btn">Join Us</button>
        </Link>
        <Link to={"/login"}><button className="login-btn">Login</button></Link>
      </div>
      </div>
      <div className="home-section-right">
          <div className="home-imgCont">
            <img src={logoNoText} alt="" />
          </div>
      </div>
    </section>}
    </>
  );
};

export default HomePage;
