import { Link } from "react-router-dom";
import "../../style/photoContainer.css";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import alien from "../../assets/alien.jpeg";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/globalError";
import LikeService from "../../service/like";
import { BsTrash3 } from "react-icons/bs";
import PhotoService from "../../service/photo";

export default function PhotoContainerForCollection({photoId,collectionOwnerId,currentUserId,removeFn }) {
  const [liked, setLiked] = useState(false);
  const [photo, setPhoto] = useState({});

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const fetchPhoto = useCallback(async () => {
        try {
            const res = await PhotoService.getPhotoById(photoId);
            console.log(res.data);
            setPhoto(res.data);
        } catch (error) {
            dispatch(setError(error?.response?.data.message || error.message));
        }
  },[])

  const fetchLikedStatus = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await LikeService.checkPhotoLiked(accessToken, photoId);
      setLiked(res.data);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  }, [accessToken, photoId, dispatch]);

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
    fetchPhoto()
    fetchLikedStatus();
  }, [fetchPhoto,fetchLikedStatus]);

  return (
    <div  className="photo-container">
        <Link to={`/photos/${photo?._id}`}>
      <img src={photo?.photoFile} alt="" />
      </Link>
      <div className="photo-options">
        <button onClick={likePhoto}>
          {liked ? <IoHeart /> : <IoHeartOutline />}
        </button>
        {collectionOwnerId === currentUserId && <button onClick={()=>removeFn(photoId)}>
          <BsTrash3 className="icon" />
        </button>}
      </div>

      <div className="photo-info">
        <div className="photo-info-btm">
          <div className="photo-info-btm-left">
            <img src={photo?.owner?.avatar ? photo?.owner?.avatar : alien} alt="" />
          </div>
          <div className="photo-info-btm-right">
            <h3>{photo?.title}</h3>
            <div>@{photo?.owner?.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
