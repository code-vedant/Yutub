import { useEffect, useState, useCallback } from "react";
import "../style/homepage.css";
import { Link } from "react-router-dom";
import VideoService from '../service/video'
import VideoContainer from "../components/VideoComponents/VideoContainer";
import PhotoService from "../service/photo";
import PhotoContainer from "../components/Photos/PhotoContainer";
import PostCard from "../components/TweetComponents/PostCard";
import TweetService from "../service/tweet";
import {setError} from "../store/globalError"
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()

  const getRandomSubset = (arr, count = 6) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  

  const fetchVideos = useCallback(async () => {
    try {
      const res = await VideoService.getAllVideos();
      setVideos(getRandomSubset(res.data.docs, 6));
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data?.message || error.message);
      dispatch(setError(error.response?.data?.message || error.message));
    }
  }, []);

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await PhotoService.getAllPhotos();
      setPhotos(getRandomSubset(res.data.docs, 6));
    } catch (error) {
      console.error("Error fetching photos:", error.response?.data?.message || error.message);
      dispatch(setError(error.response?.data?.message || error.message));

    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await TweetService.getAllTweets();
      setPosts(getRandomSubset(res.data.docs, 6));
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data?.message || error.message);
      dispatch(setError(error.response?.data?.message || error.message));

    }
  }, []);


  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const promises = [
        fetchVideos(),
        fetchPhotos(),
        fetchPosts()
      ];
  
      await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  }, [fetchVideos, fetchPhotos, fetchPosts,dispatch]);
  
    
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const displayVideos = videos.slice(0, 6);
  const displayPhotos = photos.slice(0, 6);
  const displayPosts = posts.slice(0, 6);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section>
      <div className="section_box">
        <div className="section_header">
          <h2>Videos</h2>
          <Link to={"/videos"}>view more</Link>
        </div>
        <div className="video_container">
          {displayVideos.map((video) => (
            <VideoContainer key={video._id} video={video} withUser={true} />
          ))}
        </div>
      </div>
      
      <div className="section_box">
        <div className="section_header">
          <h2>Photos</h2>
          <Link to={"/photos"}>view more</Link>
        </div>
        <div className="photo_container">
          {displayPhotos.map((photo) => (
            <PhotoContainer key={photo._id} photo={photo} />
          ))}
        </div>
      </div>
      
      <div className="section_box">
        <div className="section_header">
          <h2>Posts</h2>
          <Link to={"/posts"}>view more</Link>
        </div>
        <div className="post_container">
          {displayPosts.map((post,idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;