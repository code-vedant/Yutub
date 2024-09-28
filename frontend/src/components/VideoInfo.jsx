import React, { useEffect, useState } from "react";
import like from "../assets/like.png";
import liked from "../assets/liked.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/videoplayerpage.css";
import LikeService from "../Service/like";
import { addLikedVideo, removeLikedVideo } from "../store/LikesSlice";
import SubService from "../Service/subscription";
import { addSubscribedChannel, removeSubscribedChannel } from "../store/subsStore";

const VideoInfo = ({ videoData }) => {

  const { title, description,commentsCount,likesCount ,views, isLiked, likes, owner, subscribed } = videoData;  
  const [isExpanded, setIsExpanded] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state)=>state.auth.userData)
  const dispatch = useDispatch()


  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const shorter = (text) => {
    if (text.length > 120) {
      return text.substring(0, 120) + ". . .";
    } else return text;
  };

  const toggleLike = async () => {
    try {
      const response = await LikeService.toggleVideoLike(accessToken, videoData._id);
      if (response.data !== null) { 
        if (response.data !== null) {
          dispatch(addLikedVideo(videoData._id));
        } else { 
          dispatch(removeLikedVideo(videoData._id));
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }

  }

  const toggleSubscription = async () => {
    try {
      const response = await SubService.toggleSubscription(accessToken, owner._id);
      if (response.data.channel === undefined){
        dispatch(removeSubscribedChannel(owner._id))
      }else{
         dispatch(addSubscribedChannel(owner._id));
      }
      
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const subscription = useSelector((state)=> state.subscription.subscribedChannels)

  const videos = useSelector((state)=> state.like.likedVideos)

  return (
    <div className="VI-video-info">
      <h3 className="title">{title}</h3>
      <div className="VI-channel-info">
          <div className="VI-profileImg">
          <Link to={`/profile/${owner._id}`}>
            <img src={owner ? owner.avatar : ""} alt="" />
        </Link>
          </div>
        <Link to={`/profile/${owner._id}`}>
          <h3>{owner ? owner.fullName : "Rolando"}</h3>
        </Link>
      <div className="VI-likes">
          <img src={videos.includes(videoData._id) ? liked : like} alt="like" onClick={toggleLike} />
          <h5>{likesCount ? likesCount : "100"}&nbsp;like</h5>
        </div>
        {user._id === owner._id ? (
  <Link to="/dashboard">
    <button className={`subscribe-button`}>
      Go to Dashboard
    </button>
  </Link>
) : (
  <button
    onClick={toggleSubscription}
    className={`subscribe-button ${subscription.includes(owner._id) ? "subscribed" : ""}`} 
  >
    {subscription.includes(owner._id) ? "Subscribed" : "Subscribe"}
  </button>
)}
      </div>
      <div className="VI-statAndDes">
        <div className="VI-statAndDes-v">
          <span>{videoData?.views || "0"}&nbsp;views</span>
          <span>
            {videoData.updatedAt ? timeAgo(videoData.updatedAt) : "days ago"}
          </span>
        </div>
        <div className="separator"></div>
        {description.length > 120 ? (
          !isExpanded ? (
            <p>{shorter(description)}</p>
          ) : (
            <p>{description}</p>
          )
        ) : (
          <p>{description}</p>
        )}
        {description.length > 120 && (
          <button onClick={handleToggle} className="expand-button">
            {isExpanded ? "Show less" : "...more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
