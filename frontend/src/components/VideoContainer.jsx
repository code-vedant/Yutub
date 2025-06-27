import  { useState } from "react";
import "../style/videoContainer.css";
import { useSelector } from "react-redux";
import robot from "../assets/robot.png";
import { Link } from "react-router-dom";
import AddToPlaylist from "./PlaylistComponents/AddToPlaylist";
import PopupHolder from "./PopupHolder";
import { BsThreeDotsVertical } from "react-icons/bs";

function VideoContainer({ video }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const [editModal, setEditModal] = useState(false);

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

  const shorter = (item,len) => {
    if (item.length > len) {
      return item.substring(0, len) + "...";
    } else return item;
  };


  const duration = (item) => {
    if (item < 60) {
      return `${item.toFixed(2)} s`;
    } else if (item < 3600) {
      const minutes = Math.floor(item / 60);
      const remainingSeconds = (item % 60).toFixed(2);
      return `${minutes} min ${remainingSeconds} s`;
    } else {
      const hours = Math.floor(item / 3600);
      const remainingMinutes = Math.floor((item % 3600) / 60);
      const remainingSeconds = (item % 60).toFixed(2);
      return `${hours} hr ${remainingMinutes} min ${remainingSeconds} s`;
    }
  };

  return (
    <div className="video-container">
      <div className="VC-top">
        <div className="video-thumbnail">
          <Link to={`/videopage/${video?._id}`}>
          <img src={video.thumbnail ? video.thumbnail : ""} alt="title" />
          <span className="video-duration">
            {duration(video.duration) || `10 min`}
          </span>
          </Link>
        </div>
      </div>
      <div className="VC-bottom">
        <div className="VC-left">
          <Link to={`/profile/${video.ownerData?._id === user?._id ? "" : video.ownerData?._id}`}>
            <div className="VC-left-imgHolder">
              {video?.ownerData?.avatar ? (
                <img src={video?.ownerData?.avatar} className="imgRec" />
              ) : (
                <img src={robot} />
              )}
            </div>
          </Link>
        </div>
        <div className="VC-right">
          <div className="video-info">
          <Link to={`/videopage/${video?._id}`}>
          <h3 className="video-title">
              {video.title ? shorter(video.title,70) : "title of video"}
            </h3>
            <Link to={`/profile/${video?.owner || ""}`}>
              <h3 className="video-channel">
                {video.ownerData ? video.ownerData?.fullName : "Channel Name"}
              </h3>
            </Link>
            {/* <p className="video-description">
              {video.description
                ? shorter(video.description,45)
                : "Lorem ipsum dolor sit amet consectetur."}
            </p> */}
            <div className="video-stats">
              <span>{video?.views || "0"}&nbsp;views</span>
              <span>
                {video.createdAt ? timeAgo(video.createdAt) : "days ago"}
              </span>
            </div>
          </Link>
            
          </div>
          <div className="video-options">
            <div className="vo-icon">
            <BsThreeDotsVertical className="vo-three-dot" />
            </div>
            <div className="vo-options">
              <button onClick={handlePlaylistOptions}>Add to playlist</button>
            </div>
          </div>
        </div>
      </div>
      {editModal && (
        <PopupHolder>
          <AddToPlaylist
            closePlaylistOptions={closePlaylistOptions}
            accessToken={accessToken}
            videoId={video?._id}
          />
        </PopupHolder>
      )}
    </div>
  );
}

export default VideoContainer;
