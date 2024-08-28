import React, { useState } from 'react';
import like from "../assets/like.png"

const VideoInfo = ({ videoData}) => {

   const { title, description, likes, dislikes, channelName , subscribed } = videoData;

  const [isSubscribed, setIsSubscribed] = useState(subscribed);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="video-info">
      <h3 className='title'>{title}</h3>
      <div className="channel-info">
        <h3>{channelName}</h3>
        <button onClick={handleSubscribe} className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}>
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className="video-stats">
        <img src={like} alt="like" />
        <h5>{likes}</h5>
        <img src={like} alt="dislike" />
        <h5>{dislikes}</h5>
        <h5>10min</h5>
      </div>
      <div className="separator"></div>
      <p>{description}</p>
    </div>
  );
};

export default VideoInfo;
