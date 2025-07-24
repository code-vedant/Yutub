import { useCallback, useEffect, useState } from "react";
import VideoContainer from "../VideoComponents/VideoContainer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import VideoService from "../../service/video";
import "../../style/profile/videoTab.css";

export default function PostTab({ id }) {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const fetchVideos = useCallback(async () => {
    try {
      const res = await VideoService.getUserVideos(id);
      //console.log("Fetched Videos:", res.data);
      setVideos(res.data || []);
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Failed to fetch videos"));
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="VideoTab_Main">
      {videos.length ? (
        <div className="videoGrid">
          {videos.map((video) => (
            <div key={video._id} className="videoTabItem">
              <Link to={`/videopage/${video._id}`}>
                <VideoContainer video={video} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // <img/>
        <p>heel</p>
      )}
    </div>
  );
}
