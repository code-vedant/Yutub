import React, { useEffect, useState } from "react";
import "../style/videobox.css";
import VideoService from "../Service/video";

function VideoBox({ videoId,accessToken }) {
  const [video,setVideo] = useState("")

  useEffect(()=> {
    const getVideoData = async () => {
      try {
        const response = await VideoService.getVideoById(accessToken, videoId)
        setVideo(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getVideoData()
  },[videoId])


  const shorter = (item) => {
    if (item.length > 42) {
      return item.substring(0, 42) + "...";
    } else return item;
  };
  const shorterMid = (item) => {
    if (item.length > 66) {
      return item.substring(0, 70) + "...";
    } else return item;
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
  
  return (
    <div className="VideoBoxMain">
      <div className="video-box">
        <div className="video-box-thumbnail">
          <img
            src={video.thumbnail || "https://images.unsplash.com/photo-1717501218661-0322e4bc4c81?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="title"
          />
        </div>
        <div className="video-box-info">
          <h3>{video ? shorterMid(video.title) : "title"}</h3>
          <p>{video ? shorterMid(video.description) : "loemdkjanfbjhf asdcadbsfhscbdas basdjc asdbc "}</p>
          <h5>{video ? video.owner.fullName : "Channel Name"}</h5>
          <p>
            <span>{video ? video.views : "1M"} views</span><span>{ video ? timeAgo(video.createdAt) : "2 weeks ago"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;
