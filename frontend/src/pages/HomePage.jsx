import React, { useEffect, useState } from "react";
import VideoContainer from "../components/VideoContainer.jsx";
import VideoService from "../Service/video.js";
import logoNoText from "../assets/logoNoText.png";
import { Link } from "react-router-dom";
import "../style/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import PopupHolder from "../components/PopupHolder.jsx";
import LikeService from "../Service/like.js";
import { addLikedComment, addLikedTweet, addLikedVideo } from "../store/LikesSlice.js";
import SubService from "../Service/subscription.js";
import { addSubscribedChannel } from "../store/subsStore.js";
const HomePage = () => {
  const [videos, setVideos] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authStatus = useSelector((state) => state.auth.status)
  const user = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()


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

  const fetchLikedViideos = async () => {
    try {
      const res = await LikeService.getLikedVideos(accessToken)
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        res.data.forEach(videoData => {
          const videoId = videoData.video?._id; 
          dispatch(addLikedVideo(videoId));
        });}
      
    } catch (error) {
      console.log("Failed to fetch");
      
    }
  }

  const fetchLikedTweets = async () => {
    try {
      const res = await LikeService.getLikedTweet(accessToken);
  
      if (res.data && Array.isArray(res.data)) {
        res.data.forEach(tweetData => {
          const tweetId = tweetData.tweet?._id;
          dispatch(addLikedTweet(tweetId));
        });
      }
      
    } catch (error) {
      console.log("Failed to fetch liked tweets:", error);
    }
  };

  const fetchLikedComments = async () => {
    try {
      const res = await LikeService.getLikedComment(accessToken);
  
      if (res.data && Array.isArray(res.data)) {
        res.data.forEach(comment => {
          const commentId = comment.tweet?._id;
          dispatch(addLikedComment(commentId));
        });
      }
      
    } catch (error) {
      console.log("Failed to fetch liked tweets:", error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await SubService.getSubscribedChannel(accessToken, user?._id);
  
      if (res.data && Array.isArray(res.data)) {
        res.data.forEach(subData => {
          if (Array.isArray(subData.channel) && subData.channel.length > 0) {
            subData.channel.forEach(channel => {
              if (channel && channel?._id) {
                const channelId = channel?._id;
                dispatch(addSubscribedChannel(channelId));
              } else {
                console.log("Invalid channel data:", channel);
              }
            });
          } else {
            console.log("Empty or invalid channel array:", subData);
          }
        });
      }
    } catch (error) {
      console.log("Failed to add subscription", error);
    }
  };
  

  const subscription = useSelector((state)=> state.subscription.subscribedChannels)
  
  

  useEffect(() => {
    fetchVideos();
    fetchLikedViideos();
    fetchLikedTweets();
    fetchLikedComments();
    fetchSubscribers()
  }, [accessToken]);


  return (
    <>
    {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
    {authStatus && <div className="youtube-homepage">
      {Array.isArray(videos) && videos.map((video,index) => (
        <div key={video?._id} className="vidcont">
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
