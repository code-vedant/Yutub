import React from "react";
import "../style/videobox.css";

function VideoBox({ video }) {
  return (
    <div className="VideoBoxMain">
      <div className="video-box">
        <div className="video-box-thumbnail">
          <img
            src="https://images.unsplash.com/photo-1717501218661-0322e4bc4c81?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="title"
          />
        </div>
        <div className="video-box-info">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <p>
            <span>1M views</span> ·<span>2 weeks ago</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;
