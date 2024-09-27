import React from "react";
import "../../style/playlist.style.css";
import { Link } from "react-router-dom";

function PlaylistComponent({ playlist }) {
  console.log(playlist);
  
  console.log(playlist.videos.length);

  const shorter = (item) => {
    if (item.length > 70) {
      return item.substring(0, 70) + "...";
    }
    return item;
  }

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
    <div className="PlaylistComponent-main">
      <Link to={`/playlist/${playlist._id}`}>
      <div className="PC-image">
        <img
          src={
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
          }
          alt="Person using a phone"
        />
      </div>
      <div className="PC-content">
        <h3 className="PC-title">{playlist.name}</h3>
        <p className="PC-description">{shorter(playlist.description) || ""}</p>
        <div className="PC-footer">
          <span className="PC-playlist">Playlist</span>
          <span className="PC-views">{timeAgo(playlist.createdAt || "now")}</span>
          <span className="PC-videos">{playlist.videos.length} videos</span>
        </div>
      </div>
      </Link>
      
    </div>
  );
}

export default PlaylistComponent;
