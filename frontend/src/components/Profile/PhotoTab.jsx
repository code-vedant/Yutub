import { useCallback, useEffect, useState } from "react";
import VideoContainer from "../VideoComponents/VideoContainer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import "../../style/profile/videoTab.css";
import PhotoService from "../../service/photo";
import PhotoContainer from "../Photos/PhotoContainer";
import NoPhoto from "./NoPhoto";

export default function PhotoTab({ id }) {
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  const fetchPhotos = useCallback(async () => {
    try {
      if (id !== undefined && id !== null) {
        const res = await PhotoService.getUserPhotos(id);
        setPhotos(res.data || []);
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch photos")
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <div className="VideoTab_Main">
      {photos.length ? (
        <div className="videoGrid">
          {photos.map((photo) => (
            <div key={photo._id} className="videoTabItem">
              <Link to={`/photo/${photo._id}`}>
                <PhotoContainer photo={photo}/>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <NoPhoto />
      )}
    </div>
  );
}
