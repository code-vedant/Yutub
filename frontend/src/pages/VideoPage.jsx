import { useEffect, useState } from "react";
import VideoService from "../service/video";
import VideoContainer from "../components/VideoComponents/VideoContainer";
import "../style/videopage.css";
import FilterComponent from "../components/VideoComponents/FilterComponent";
import { useDispatch } from "react-redux";
import { setError } from "../store/globalError";

export default function VideoPage() {
  const [video, setVideo] = useState([]);
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    query: "",
    sortBy: "createdAt",
    sortType: "desc",
    page: 1,
  });

  

  useEffect(() => {
    const getVideos = async () => {
      setError("");
      try {
        const res = await VideoService.getAllVideos(filters);
        setVideo(res.data.docs);
      } catch (error) {
        dispatch(setError(error.response.data.message));
      }
    };
    getVideos();
  }, [filters]);

  return (
    <section className="videopage-main">
      <FilterComponent type={"Videos"} filters={filters} setFilters={setFilters} />
      <section className="videopage-container">
        {video.map((vid) => (
          <VideoContainer key={vid._id} video={vid} withUser={true} />
        ))}
      </section>
    </section>
  );
}
