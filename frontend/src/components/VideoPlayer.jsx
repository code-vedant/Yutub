import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player">
      <video src={url} controls width="100%" height="100%" className="react-video-player" />
    </div>
  );
};

export default VideoPlayer;
