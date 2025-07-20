import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../service/auth";
import { setError } from "../store/globalError";
import VideoHoriz from "../components/VideoComponents/VideoHoriz";
import "../style/videos/watchhistory.css";
import VideoService from "../service/video";

export default function WatchHistoryPage() {
  const [watchHistory, setWatchHistory] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const getUserWatchHistory = async () => {
    try {
      const response = await AuthService.getUserData(accessToken);
      console.log(response.data.watchHistory);
      setWatchHistory(response.data.watchHistory);
    } catch (error) {
      console.error("Error fetching current user:", error);
      dispatch(
        setError(
          error.response?.data?.message || "Failed to fetch watch history"
        )
      );
    }
  };

  const [showDeleteModel, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const removeVideoFromWatchHistory = async (videoId) => {
    try {
      await VideoService.removeFromWatchHistory(accessToken, videoId);
      closeDeleteModal();
      console.log("Video removed from watch history successfully.");
    } catch (error) {
      console.error("Error removing video from watch history:", error);
    }
  };

  useEffect(() => {
    getUserWatchHistory();
  }, []);

  return (
    <div className="wh-main">
      <h2>Watch History</h2>
      <div className="wh-videos">
        {watchHistory.length > 0 &&
          watchHistory.map((video) => (
            <VideoHoriz
              key={video._id}
              videoId={video}
              showModel={showDeleteModel}
              itemText={"Video from Watch History"}
              mainFn={removeVideoFromWatchHistory}
              handleFn={handleDeleteModal}
              closeFn={closeDeleteModal}
            />
          ))}
      </div>
    </div>
  );
}
