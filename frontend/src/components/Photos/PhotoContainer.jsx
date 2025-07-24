import { Link } from "react-router-dom";
import "../../style/photoContainer.css";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import alien from "../../assets/alien.jpeg";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/globalError";
import LikeService from "../../service/like";

export default function PhotoContainer({ photo }) {
  const [liked, setLiked] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const fetchLikedStatus = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await LikeService.checkPhotoLiked(accessToken, photo._id);
      setLiked(res.data);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  }, [accessToken, photo, dispatch]);

  const likePhoto = async () => {
    if (!accessToken) {
      dispatch(setError("Login to like the photo."));
      return;
    }

    try {
      await LikeService.togglePhotoLike(accessToken, photo._id);
      setLiked((prev) => !prev);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  };

  useEffect(() => {
    fetchLikedStatus();
  }, [fetchLikedStatus]);

  return (
    <Link to={`/photos/${photo?._id}`} className="photo-container">
      <img src={photo.photoFile} alt="" />
      <div className="photo-options">
        <button onClick={likePhoto}>
          {liked ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>

      <div className="photo-info">
        <div className="photo-info-btm">
          <div className="photo-info-btm-left">
            <img src={photo.owner.avatar ? photo.owner.avatar : alien} alt="" />
          </div>
          <div className="photo-info-btm-right">
            <h3>{photo.title}</h3>
            <div>@{photo.owner.username}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
