import React, { useState } from "react";
import "../style/VideoContainerForProfile.css";
import { useSelector } from "react-redux";
import dots from "../assets/dots.png";
import PopupHolder from "./PopupHolder";
import AddToPlaylist from "./PlaylistComponents/AddToPlaylist";

function VideoContainerForProfile({ video }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [editModal, setEditModal] = useState(false);
  const { id: owner } = video;

  const handlePlaylistOptions = () => {
    setEditModal(true);
  };

  const closePlaylistOptions = () => {
    setEditModal(false);
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

  const shorter = (item) => {
    if (item.length > 45) {
      return item.substring(0, 45) + "...";
    } else return item;
  };

  const shorterMid = (item) => {
    if (item.length > 60) {
      return item.substring(0, 60) + "...";
    } else return item;
  };

  return (
    <div className="video-container-FP">
      <div className="video-thumbnail-FP">
        <img src={video.thumbnail} alt="title" />
        <span className="video-duration-FP">10min</span>
      </div>
      <div className="video-info-FP">
        <div className="video-info-FP-data">
          <h3 className="video-title-FP">
            {video.title ? shorterMid(video.title) : "title of video"}
          </h3>
          <p className="video-description-FP">
            {video.description
              ? shorter(video.description)
              : "Lorem ipsum dolor sit amet consectetur."}
          </p>
          <div className="video-stats-FP">
            <span>{video?.views || "0"}&nbsp;views</span>
            <span>{timeAgo(video.updatedAt) || "days ago"}</span>
          </div>

          
        </div>
        <div className="video-options-FP">
            <div className="vo-icon-FP">
              <img src={dots} alt="" />
            </div>
            <div className="vo-options-FP">
              <button onClick={handlePlaylistOptions}>Add to playlist</button>
            </div>
          </div>
      </div>
      {editModal && (
        <PopupHolder>
          <AddToPlaylist
            closePlaylistOptions={closePlaylistOptions}
            accessToken={accessToken}
            videoId={video._id}
          />
        </PopupHolder>
      )}
    </div>
  );
}

export default VideoContainerForProfile;
