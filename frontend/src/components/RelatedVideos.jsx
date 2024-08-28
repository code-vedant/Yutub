import React from 'react';
import VideoBox from './VideoBox';

const RelatedVideos = ({ videos }) => {
  return (
    <div className="related-videos">
      <h2>Related Videos</h2>
      <ul>
        {videos.map(video => (
          <VideoBox key={video.id} video={video}/>
        ))}
      </ul>
    </div>
  );
};

export default RelatedVideos;
