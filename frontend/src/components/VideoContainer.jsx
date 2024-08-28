import React from 'react';
import '../style/videoContainer.css';

function VideoContainer({ video }) {
  return (
    <div className="video-container">
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt="title" />
        <span className="video-duration">10min</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <h3 className="video-channel">beast</h3>
        <p className="video-description">Lorem ipsum dolor sit amet.</p>
        <div className="video-stats">
          <span>1M views</span>
          <span>2 weeks ago</span>
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;