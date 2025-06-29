import React, { useCallback, useEffect, useState } from 'react';
import VideoService from '../../service/video';
import { useDispatch } from 'react-redux';
import { setError } from '../../store/globalError';
import VideoContainer from './VideoContainer';
import { BsCameraVideo } from "react-icons/bs";

const RelatedVideos = ({ owner }) => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const fetchUserVideos = useCallback(async () => {
    try {
      const response = await VideoService.getUserVideos(owner._id);
      setVideos(response.data)
    } catch (error) {
        dispatch(setError(error.response.data.message || "An error occurred while fetching videos."));
    }
  },[])

  useEffect(() => {
    fetchUserVideos()
  }, []);
  
  return (
    <div className="related-videos-renderer">
      {videos.length > 0 &&
      <>
       <h2 className='more-title'>Videos from {owner.fullName}</h2>
      <ul className='related-videos-list'>
        {videos.map(video => (
          <VideoContainer key={video.id} video={video}/>
        ))}
      </ul>
        </>
      }
      <div className="addVideoAd">
        <h3>Have a video to share?</h3>
        <div className='camera-icon-container'>
        <BsCameraVideo className="camera-icon" />

        </div>
        <p>Upload your video and join the community!</p>
        <button className="upload-button">Upload Video</button>
      </div>
    </div>
  );
};

export default RelatedVideos;
