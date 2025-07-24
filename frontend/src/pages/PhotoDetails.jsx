import "../style/photos/photodetails.css";
import { IoClose, IoHeartOutline, IoHeart, IoImagesOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/globalError";
import PhotoService from "../service/photo";
import { useNavigate, useParams } from "react-router-dom";
import { BsFullscreen } from "react-icons/bs";
import CommentService from "../service/comment";
import LikeService from "../service/like";

export default function PhotoDetails() {
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageContainerRef = useRef();
  const { id: photoId } = useParams();

  const handleFullscreen = () => {
    if (imageContainerRef.current.requestFullscreen) {
      imageContainerRef.current.requestFullscreen();
    } else if (imageContainerRef.current.webkitRequestFullscreen) {
      imageContainerRef.current.webkitRequestFullscreen();
    } else if (imageContainerRef.current.msRequestFullscreen) {
      imageContainerRef.current.msRequestFullscreen();
    }
  };

  const closeFn = () => {
    navigate(-1, { state: { backgroundLocation: null } });
  };

  const fetchPhotoDetails = useCallback(async () => {
    try {
      const res = await PhotoService.getPhotoById(photoId);
      setPhoto(res.data);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  }, [photoId, dispatch]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await CommentService.getPhotoComments(photoId);
      setComments(res.data);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  }, [photoId, dispatch]);

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
      await LikeService.togglePhotoLike(accessToken , photoId);
      setLiked((prev) => !prev);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  };

  useEffect(() => {
    fetchPhotoDetails();
    fetchComments();
    fetchLikedStatus();
  }, [fetchPhotoDetails, fetchComments, fetchLikedStatus]);

  return (
    <div className="photoDetails-main">
      <h2>
        {photo?.title} by {photo?.owner.fullName}
      </h2>
      <button onClick={closeFn} className="modal-close">
        <IoClose className="icon" />
      </button>

      <div className="photoDetails-details">
        <div className="photoDetails-details-left">
          <img
            ref={imageContainerRef}
            src={photo?.photoFile}
            alt={photo?.title}
          />
          <button onClick={handleFullscreen} className="fullscreen-btn">
            <BsFullscreen className="icon" />
          </button>
        </div>

        <div className="photoDetails-details-right">
          <div className="photoDetails-details-right-top">
            <h3>{photo?.title}</h3>
            <p>{photo?.description}</p>
            <div className="photoDetails-options">
              <button onClick={likePhoto}>
                {liked ? <IoHeart style={{color: "#2b1515"}} className="liked" /> : <IoHeartOutline />}
              </button>
              <button>
                <IoImagesOutline />
              </button>
            </div>
          </div>

          <div className="photoDetails-details-right-mid">
            <div className="photoDetails-owner">
              <img
                src={photo?.owner.avatar || "https://via.placeholder.com/150"}
                alt={photo?.owner.fullName}
              />
            </div>
            <div className="photoDetails-owner-details">
              <h3>{photo?.owner.fullName}</h3>
              <p>@{photo?.owner.username}</p>
            </div>
          </div>

          <div className="photoDetails-details-right-bottom">
            <h4>Comments</h4>
            <form action="">
              <input placeholder="Add a comment..." />
              <button type="submit">Add</button>
            </form>
            <div className="photoDetails-comments">
              {comments?.length > 0 &&
                comments.map((comment) => (
                  <div className="comment-tab" key={comment?._id}>
                    <p>{comment?.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
