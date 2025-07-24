import { CiBookmark } from "react-icons/ci";
import "../style/photos/photodetails.css";
import { IoClose, IoHeartOutline, IoImagesOutline } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../store/globalError";
import PhotoService from "../service/photo";
import { useNavigate, useParams } from "react-router-dom";
import { BsFullscreen } from "react-icons/bs";

export default function PhotoDetails() {
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageContainerRef = useRef();

  const { id: photoId } = useParams();

  const handleFullscreen = () => {
    if (imageContainerRef.current.requestFullscreen) {
      imageContainerRef.current.requestFullscreen();
    } else if (imageContainerRef.current.webkitRequestFullscreen) {
      imageContainerRef.current.webkitRequestFullscreen(); // Safari
    } else if (imageContainerRef.current.msRequestFullscreen) {
      imageContainerRef.current.msRequestFullscreen(); // IE11
    }
  };

  const closeFn = () => {
    navigate(-1, { state: { backgroundLocation: null } }); // Navigate back to the previous location
  };

  const fetchPhotoDetails = useCallback(async () => {
    try {
      const res = await PhotoService.getPhotoById(photoId);
      console.log(res.data);

      setPhoto(res.data);
    } catch (error) {
      dispatch(setError(error?.response?.data.message || error.message));
    }
  }, []);

  useEffect(() => {
    fetchPhotoDetails();
  }, [fetchPhotoDetails]);

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
              
              <button>
                <IoHeartOutline />
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
          </div>
        </div>
      </div>
    </div>
  );
}
