import { useEffect, useState, useCallback } from "react";
import "../style/homepage.css";
import { useSearchParams } from "react-router-dom";
import VideoService from '../service/video'
import VideoContainer from "../components/VideoComponents/VideoContainer";
import PhotoService from "../service/photo";
import PhotoContainer from "../components/Photos/PhotoContainer";
import PostCard from "../components/TweetComponents/PostCard";
import TweetService from "../service/tweet";
import {setError} from "../store/globalError"
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams()

  const dispatch = useDispatch()


  const fetchVideos = useCallback(async () => {
    try {
        const filter = {
            query : searchParams.get("q"),
        }
      const res = await VideoService.getAllVideos(filter);
      setVideos(res.data.docs);
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data?.message || error.message);
      dispatch(setError(error.response?.data?.message || error.message));
    }
  }, []);

  const fetchPhotos = useCallback(async () => {
    try {
        const filter = {
            search : searchParams.get("q"),
        }
      const res = await PhotoService.getAllPhotos(filter);
      setPhotos(res.data.docs);
    } catch (error) {
      console.error("Error fetching photos:", error.response?.data?.message || error.message);
      dispatch(setError(error.response?.data?.message || error.message));

    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
        const filter = {
            search : searchParams.get("q"),
        }
      const res = await TweetService.getAllTweets(filter);
      setPosts(res.data.docs);
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


  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section>
        <h3>Search Result For : {searchParams.get("q").split("-").join(" ")}</h3>
        {videos.length > 0 && <div className="section_box">
        <div className="section_header">
          <h2>Videos : Found {videos.length}</h2>
        </div>
        <div className="video_container">
          {videos.map((video) => (
            <VideoContainer key={video._id} video={video} withUser={true} />
          ))}
        </div>
      </div>}
      {videos.length > 0 && <div className="section_box">
        <div className="section_header">
          <h2>Videos : Found {videos.length}</h2>
        </div>
        <div className="video_container">
          {videos.map((video) => (
            <VideoContainer key={video._id} video={video} withUser={true} />
          ))}
        </div>
      </div>}
      
      {photos.length > 0 && <div className="section_box">
        <div className="section_header">
          <h2>Photos: Found {photos.length}</h2>
        </div>
        <div className="photo_container">
          {photos.map((photo) => (
            <PhotoContainer key={photo._id} photo={photo} />
          ))}
        </div>
      </div>}
      
      {posts.length > 0 && <div className="section_box">
        <div className="section_header">
          <h2>Posts: Found {posts.length}</h2>
        </div>
        <div className="post_container">
          {posts.map((post,idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>}
    </section>
  );
};

export default SearchPage;