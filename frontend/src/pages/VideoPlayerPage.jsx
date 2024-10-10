import React, { useEffect, useState } from "react";
import "../style/videoplayerpage.css";
import VideoPlayer from "../components/VideoPlayer.jsx";
import VideoInfo from "../components/VideoInfo.jsx";
import Comments from "../components/Comments.jsx";
import { useParams } from "react-router-dom";
import VideoService from "../Service/video.js";
import { useSelector } from "react-redux";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import CommentService from "../Service/comment.js";

const VideoPlayerPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id: videoId } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await VideoService.getVideoById(accessToken, videoId);
        if (data) {
          setVideoData(data.data);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [accessToken, videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentService.getAllComments(accessToken, videoId);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [accessToken, videoId]);

  return (
    <div className="video-player-page">
      {loading ? (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      ) : videoData ? (
        <>
          <VideoPlayer
            url={
              videoData.videoFile
                ? videoData.videoFile
                : "https://www.w3schools.com/html/mov_bbb.mp4"
            }
          />
          <VideoInfo accessToken={accessToken} videoData={videoData} />
          <Comments accessToken={accessToken} videoId={videoId} comments={comments} />
        </>
      ) : (
        <div>No video data available.</div>
      )}
    </div>
  );
};

export default VideoPlayerPage;
