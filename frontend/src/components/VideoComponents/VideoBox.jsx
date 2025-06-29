import React, { useEffect, useState } from "react";
import "../../style/videobox.css";
import { getTimeAgo } from "../../utils/getTimeAgo";

function VideoBox({ video }) {


  const shorter = (item,len) => {
    if (item.length > len) {
      return item.substring(0, len) + "...";
    } else return item;
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
          <h3>{video ? shorter(video.title,30) : "title"}</h3>
          <p>{video ? shorter(video.description,30) : "loemdkjanfbjhf asdcadbsfhscbdas basdjc asdbc "}</p>
          <h5>{video ? video.ownerData.fullName : "Channel Name"}</h5>
          <p>
            { video ? getTimeAgo(video.createdAt) : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;
