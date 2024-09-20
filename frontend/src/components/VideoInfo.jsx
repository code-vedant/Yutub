import React, { useEffect, useState } from "react";
import like from "../assets/like.png";
import liked from "../assets/liked.png";
import { useSelector } from "react-redux";
import AuthService from "../Service/auth";
import { Link } from "react-router-dom";
import "../style/videoplayerpage.css";

const VideoInfo = ({ videoData }) => {

  const { title, description,commentsCount,likesCount ,views, isLiked, likes, owner, subscribed } = videoData;  
  const [isExpanded, setIsExpanded] = useState(false);

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
          <img src={isLiked ? liked : like} alt="like" onClick={true} />
          <h5>{likes ? likes : "100"}</h5>
        </div>
        
        <button
          onClick={()=>{}}
          className={`subscribe-button ${false ? "subscribed" : ""}`}
        >
          {false ? "Subscribed" : "Subscribe"}
        </button>
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
