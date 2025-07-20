import { useEffect, useState } from "react";
import LikeService from "../service/like"
import { useSelector } from "react-redux";
import "../style/videos/watchhistory.css";

import VideoHoriz from "../components/VideoComponents/VideoHoriz";

export default function LikedVideosPage() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const likedVideos = useSelector((state) => state.like.likedVideos);
  const [showDeleteModel, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const removeLike = async (videoId) => {
    try {
      const res = await LikeService.toggleVideoLike(accessToken, videoId);
      console.log(res.data);
      closeDeleteModal();
    } catch (error) {
      console.error("Error removing video from watch history:", error);
    }
  };
  console.log(likedVideos);

  return (
    <div className="wh-main">
      <h2>Liked Videos</h2>
      <div className="wh-videos">
        {likedVideos.length > 0 &&
          likedVideos.map((video) => (
            <VideoHoriz
              key={video._id}
              videoId={video.video._id}
              showModel={showDeleteModel}
              itemText={"video's like"}
              mianFn={removeLike}
              handleFn={handleDeleteModal}
              closeFn={closeDeleteModal}
            />
          ))}
      </div>
    </div>
  );
}
