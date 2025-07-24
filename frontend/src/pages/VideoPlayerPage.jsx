import { useEffect, useState, useCallback, useMemo } from "react";
import "../style/videoplayerpage.css";
import VideoPlayer from "../components/VideoComponents/VideoPlayer.jsx";
import VideoInfo from "../components/VideoComponents/VideoInfo.jsx";
import Comments from "../components/VideoComponents/Comments.jsx";
import { useParams } from "react-router-dom";
import VideoService from "../service/video.js";
import { useSelector } from "react-redux";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import CommentService from "../service/comment.js";
import RelatedVideos from "../components/VideoComponents/RelatedVideos.jsx";
import { useQuery } from "../hooks/useQuery.jsx";

const VideoPlayerPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  
  const { id: videoId } = useParams();
  const query = useQuery();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authStatus = useSelector((state) => state.auth.status);

  const queryParams = useMemo(() => ({
    ref: query.get("ref"),
    playlistId: query.get("playlistId")
  }), [query]);

  useEffect(() => {
    let isMounted = true;
  
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const data = await VideoService.getVideoById(videoId);
  
        if (isMounted) {
          if (data?.data) {
            setVideoData(data.data);
          } else {
            setError("Video not found");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch video");
          console.error("Error fetching video:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    const addToHistory = async () => {
      if (authStatus) {
        try {
          const res = await VideoService.addToWatchHistory(accessToken, videoId);
          if (res?.data) {
            //console.log("Video added to watch history:", res.data);
          }
        } catch (error) {
          console.error("Error adding to watch history:", error);
        }
      }
    };
  
    if (videoId) {
      fetchVideo();
      addToHistory();
    }
  
    return () => {
      isMounted = false;
    };
  }, [videoId, accessToken, authStatus]);
  

  useEffect(() => {
    let isMounted = true;
    
    const fetchComments = async () => {
      if (!accessToken || !videoId) return;
      
      try {
        setCommentsLoading(true);
        setCommentsError(null);
        
        const response = await CommentService.getVideoComments(videoId);
        
        if (isMounted) {
          setComments(response?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setCommentsError(err.message || "Failed to fetch comments");
          console.error("Error fetching comments:", err);
        }
      } finally {
        if (isMounted) {
          setCommentsLoading(false);
        }
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [accessToken, videoId]);

  const videoUrl = useMemo(() => {
    return videoData?.videoFile || "https://www.w3schools.com/html/mov_bbb.mp4";
  }, [videoData?.videoFile]);

  const handleCommentsUpdate = useCallback((newComments) => {
    setComments(newComments);
  }, []);

  if (loading) {
    return (
      <div className="video-player-page">
        <PopupHolder>
          <Loader />
        </PopupHolder>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-player-page">
        <div className="error-message">
          <h2>Error loading video</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="video-player-page">
        <div className="no-data-message">
          <h2>No video data available</h2>
          <p>The requested video could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <div className="video-player-container">
        <VideoPlayer url={videoUrl} />
        
        <VideoInfo 
          accessToken={accessToken} 
          videoData={videoData} 
        />
        
        <Comments 
          accessToken={accessToken}
          videoId={videoId}
          comments={comments}
          loading={commentsLoading}
          error={commentsError}
          onCommentsUpdate={handleCommentsUpdate}
        />
      </div>
      
      <div className="related-videos">
        <RelatedVideos owner={videoData.owner} />
      </div>
    </div>
  );
};

export default VideoPlayerPage;