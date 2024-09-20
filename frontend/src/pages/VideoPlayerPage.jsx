import React, { useEffect, useState } from "react";
import "../style/videoplayerpage.css";
import VideoPlayer from "../components/VideoPlayer.jsx";
import VideoInfo from "../components/VideoInfo.jsx";
import Comments from "../components/Comments.jsx";
import RelatedVideos from "../components/RelatedVideos.jsx";
import { useParams } from "react-router-dom";
import VideoService from "../Service/video.js";
import { useSelector } from "react-redux";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import CommentService from "../Service/comment.js";

const VideoPlayerPage = () => {
  const [videoData, setVideoData] = useState(null); // Start with null to handle loading
  const { id: videoId } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const data = await VideoService.getVideoById(accessToken, videoId);
        if (data) {
          console.log("Data fetched", data.data);
          setVideoData(data.data);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentService.getAllComments(accessToken,videoId);
        console.log("COmment:",response.data);    
        setComments(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="video-player-page">
      {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <div className="left">
        {videoData ? (
          <>
            <VideoPlayer
              url={
                videoData.videoFile
                  ? videoData.videoFile
                  : "https://www.w3schools.com/html/mov_bbb.mp4"
              }
            />
            <VideoInfo videoData={videoData} />
            <Comments comments={comments} />
          </>
        ) : (
          <div>{loading && (
            <PopupHolder>
              <Loader />
            </PopupHolder>
          )}</div>
        )}
      </div>
      <div className="right">{/* <RelatedVideos /> */}</div>
    </div>
  );
};

export default VideoPlayerPage;
