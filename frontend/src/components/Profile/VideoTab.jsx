import { useCallback, useEffect, useState } from "react";
import VideoContainer from "../VideoComponents/VideoContainer";
import { Link } from "react-router-dom";
import NoVideo from "./NoVideo";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import VideoService from "../../service/video";
import "../../style/profile/videoTab.css";

export default function VideoTab({ id }) {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const fetchVideos = useCallback(async () => {
    try {
      if (id !== undefined && id !== null) {
        const res = await VideoService.getUserVideos(id);
        setVideos(res.data || []);
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch videos")
      );
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
                <VideoContainer video={video} />
            </div>
          ))}
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
