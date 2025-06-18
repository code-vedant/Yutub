import { useEffect, useState } from "react";
import "../style/homepage.css";
import { Link } from "react-router-dom";
import VideoService from '../service/video'
import { useSelector } from "react-redux";
import VideoContainer from "../components/VideoContainer";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [photoes, setPhotoes] = useState([]);
  const [posts, setPosts] = useState([]);

  const accessToken = useSelector((state) => state.auth.accessToken);
    const fetchVideos = async () => {
        try {
          const res = await VideoService.getAllVideos();
          console.log(res.data.docs.slice(0, 6));
          const randomArr = res.data.docs.sort(() => Math.random() - 0.5).slice(0, 6);
          setVideos(randomArr);
        } catch (error) {
          console.error("Error fetching videos:", error.response.data.message);
          
        }
    }

    
    
    useEffect(() => {
      fetchVideos();
    }, []);

    console.log(videos);

    return (
    <section>
      <div className="section_box">
        <div className="section_header">
          <h2>Videos</h2>
          <Link to={"/videos"}>view more</Link>
        </div>
          <div className="video_container">
            {videos.map((video) => (
              <VideoContainer key={video._id} video={video} />
            ))}
          </div>
        </div>
        <div className="section_box">
        <div className="section_header">
          <h2>Photos</h2>
          <Link to={"/photos"}>view more</Link>
        </div>
          <div className="video_container">
            {videos.map((video) => (
              <VideoContainer key={video._id} video={video} />
            ))}
          </div>
        </div>
        <div className="section_box">
        <div className="section_header">
          <h2>Posts</h2>
          <Link to={"/posts"}>view more</Link>
        </div>
          <div className="video_container">
            {videos.map((video) => (
              <VideoContainer key={video._id} video={video} />
            ))}
          </div>
        </div>
    </section>
  );
};

export default HomePage;
