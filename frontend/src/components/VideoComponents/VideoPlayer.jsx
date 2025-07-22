const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player">
      <video src={url.replace(/^http:\/\//, 'https://')} controls width="100%" height="100%" className="react-video-player" />
    </div>
  );
};

export default VideoPlayer;
