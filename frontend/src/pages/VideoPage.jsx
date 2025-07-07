import { useEffect, useState } from "react";
import VideoService from "../service/video";
import VideoContainer from "../components/VideoComponents/VideoContainer";
import "../style/videopage.css";
import FilterComponent from "../components/VideoComponents/FilterComponent";

export default function VideoPage() {
  const [video, setVideo] = useState([]);
  const [error, setError] = useState("");

  const getVideos = async () => {
    setError("");
    try {
      const res = await VideoService.getAllVideos();
      setVideo(res.data.docs);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <section className="videopage-main">
      <FilterComponent />
      <section className="videopage-container">
        {error && <p>{error}</p>}
        {video.map((vid) => (
          <VideoContainer key={vid._id} video={vid} withUser={true} />
        ))}
      </section>
    </section>
  );
}
