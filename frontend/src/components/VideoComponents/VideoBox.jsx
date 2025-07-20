import { useCallback, useEffect, useState } from "react";
import "../../style/videobox.css";
import { getTimeAgo } from "../../utils/getTimeAgo";
import VideoService from "../../service/video";
import getShortenString from "../../utils/getShortenString";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopupHolder from "../PopupHolder";
import RemoveModal from "../modals/RemoveModal";

function VideoBox({playlistId, videoId, playlistOwnerId, currentUserId,removeFn }) {
  const [video, setVideo] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModel, setDeleteModal] = useState(false);

  const toggleOptions = (e) => {
    e.stopPropagation(); 
    setShowOptions((prev) => !prev);
  };

  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const fetchVideo = useCallback(async () => {
    try {
      const response = await VideoService.getVideoById(videoId);
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".videobox-options")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="VideoBoxMain">
      <div className="videoP-box">
        <Link to={`/video/${videoId}?ref=playlist&playlistId=${playlistId}`}>
          <div className="video-boxP-thumbnail">
            <img
              src={video.thumbnail}
              alt={video?.title || "Video Thumbnail"}
            />
          </div>
        </Link>
        <div className="video-boxP-infoP">
            <img
              src={video.owner?.avatar || "https://www.gravatar.com/avatar?d=mp&s=48"}
              alt="channel"
              className="channel-avatar"
            />
            <div className="video-boxP-bottom">
            <div className="video-text-infoP">
              <Link to={`/video/${videoId}?ref=playlist&playlistId=${playlistId}`}>
                <h3>{getShortenString(video?.title || "", 80)}</h3>
              </Link>
              
              <h5>{video.owner?.fullName || "Unknown Creator"}</h5>
              <p>{getTimeAgo(video?.createdAt)}</p>
            </div>

            {playlistOwnerId === currentUserId && (
              <div className="videobox-options">
                <BsThreeDotsVertical className="icon" onClick={toggleOptions} />
                {showOptions && (
                  <ul className="videobox-edits">
                    <li className="videobox-btn" onClick={handleDeleteModal}>
                      Remove
                    </li>
                  </ul>
                )}
              </div>
            )}
            </div>
          </div>
      </div>
      {
        showDeleteModel && (
          <PopupHolder>
            <RemoveModal closeFn={closeDeleteModal} deleteFn={removeFn} item={"video from playlist"} />
          </PopupHolder>
        )
      }
    </div>
  );
}

export default VideoBox;
