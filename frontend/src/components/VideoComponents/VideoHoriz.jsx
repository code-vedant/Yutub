import { useCallback, useEffect, useState } from "react";
import "../../style/videos/VideoHoriz.css";
import { getTimeAgo } from "../../utils/getTimeAgo";
import VideoService from "../../service/video";
import getShortenString from "../../utils/getShortenString";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopupHolder from "../PopupHolder";
import RemoveModal from "../modals/RemoveModal";

function VideoHoriz({videoId ,accessToken}) {
  const [video, setVideo] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModel, setDeleteModal] = useState(false);

  const toggleOptions = (e) => {
    e.stopPropagation(); 
    setShowOptions((prev) => !prev);
  };

  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const removeVideoFromWatchHistory = async () => {
    try {
      await VideoService.removeFromWatchHistory(accessToken,videoId);
      closeDeleteModal();
      console.log("Video removed from watch history successfully.");
    } catch (error) {
      console.error("Error removing video from watch history:", error);
    }
  }

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
      if (!e.target.closest(".VideoHoriz-options")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="VideoHorizMain">
      <div className="video-box">
        <Link to={`/video/${videoId}`}>
          <div className="video-box-thumbnail">
            <img
              src={video.thumbnail}
              alt={video?.title || "Video Thumbnail"}
            />
          </div>
        </Link>
        <div className="video-box-infoH">
            <div className="video-text-infoH">
              <Link to={`/video/${videoId}`}>
                <h3>{getShortenString(video?.title || "", 120)}</h3>
              </Link>
              <h5>{video.owner?.fullName || "Unknown Creator"}</h5>
              <p>{getTimeAgo(video?.createdAt)}</p>
            </div>

              <div className="VideoHoriz-optionsH">
                <BsThreeDotsVertical className="icon" onClick={toggleOptions} />
                {showOptions && (
                  <ul className="VideoHoriz-edits">
                    <li className="VideoHoriz-btn" onClick={handleDeleteModal}>
                      Remove
                    </li>
                  </ul>
                )}
              </div>
        </div>
      </div>
      {
        showDeleteModel && (
          <PopupHolder>
            <RemoveModal closeFn={closeDeleteModal} deleteFn={removeVideoFromWatchHistory} item={"Video from your Watch History"} />
          </PopupHolder>
        )
      }
    </div>
  );
}

export default VideoHoriz;
