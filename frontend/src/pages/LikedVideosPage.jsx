import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikeService from "../service/like";
import "../style/videos/watchhistory.css";

import VideoHoriz from "../components/VideoComponents/VideoHoriz";
import { setLikedVideos } from "../store/LikesSlice";

export default function LikedVideosPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const likedVideos = useSelector((state) => state.like.likedVideos);
  const [showDeleteModel, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const removeLike = async (videoId) => {
    try {
      const res = await LikeService.toggleVideoLike(accessToken, videoId);
      //console.log(res.data);
      closeDeleteModal();
      fetchLikedVideos();
    } catch (error) {
      console.error("Error removing video from watch history:", error);
    }
  };

  const fetchLikedVideos = useCallback(async () => {
    try {
      const response = await LikeService.getLikedVideos(accessToken);
      dispatch(setLikedVideos(response.data));
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!likedVideos || likedVideos.length === 0) {
      fetchLikedVideos();
    }
  }, [likedVideos, fetchLikedVideos]);

  return (
    <div className="wh-main">
      <h2>Liked Videos</h2>
      <div className="wh-videos">
        {likedVideos.length > 0 &&
          likedVideos.map((video) => (
            <VideoHoriz
              key={video?._id}
              videoId={video?.video?._id}
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
