// VideoPlayerPage.js
import React from "react";
import "../style/videoplayerpage.css";
import VideoPlayer from "../components/VideoPlayer.jsx";
import VideoInfo from "../components/VideoInfo.jsx";
import Comments from "../components/Comments.jsx";
import RelatedVideos from "../components/RelatedVideos.jsx";

const VideoPlayerPage = () => {
  const videoData = {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Sample Video Lorem ipsum dolor sit amet.",
    description: "This is a sample video description.",
    likes: 123,
    dislikes: 4,
    channelName: "Sample Channel",
    subscribed: false,
  };

  const comments = [
    { id: 1, user: "John Doe", text: "Great video!" },
    { id: 2, user: "Jane Smith", text: "Very informative, thanks!" },
  ];

  const relatedVideos = [
    { id: 1, title: "Related Video 1", url: "#" },
    { id: 2, title: "Related Video 2", url: "#" },
    { id: 3, title: "Related Video 3", url: "#" },
    { id: 4, title: "Related Video 4", url: "#" },
  ];

  return (
    <div className="video-player-page">
      <div className="left">
        <VideoPlayer url={videoData.url} />
        <VideoInfo
          videoData={videoData}
        />
        <Comments comments={comments} />
      </div>
      <div className="right">
        <RelatedVideos videos={relatedVideos} />
      </div>
    </div>
  );
};

export default VideoPlayerPage;
