import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../style/videoplayerpage.css";
import LikeService from "../../service/like";
import { addLikedVideo, removeLikedVideo } from "../../store/LikesSlice";
import SubService from "../../service/subscription";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import {getTimeAgo} from "../../utils/getTimeAgo";

import {
  addSubscribedChannel,
  removeSubscribedChannel,
} from "../../store/subsStore";

const VideoInfo = ({ videoData }) => {
  const { title, description, owner, createdAt } = videoData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const likedVideos = useSelector((state) => state.like.likedVideos);
  const subscribedChannels = useSelector(
    (state) => state.subscription.subscribedChannels
  );
  const dispatch = useDispatch();

  const isVideoLiked = useMemo(() => {
    return likedVideos.some(like => like.video?._id === videoData?._id);
  }, [likedVideos, videoData?._id]);

  const isChannelSubscribed = useMemo(
    () => subscribedChannels.some(subs => subs.video?._id === videoData?._id),
    [subscribedChannels, owner?._id]
  );

  const isOwnVideo = useMemo(
    () => user?._id === owner?._id,
    [user?._id, owner?._id]
  );

  const shouldShowExpandButton = useMemo(
    () => description && description.length > 120,
    [description]
  );

  const displayDescription = useMemo(() => {
    if (!description) return "";
    if (!shouldShowExpandButton) return description;
    return isExpanded ? description : description.substring(0, 120) + "...";
  }, [description, shouldShowExpandButton, isExpanded]);

  // Handlers
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const toggleLike = useCallback(async () => {
    if (!accessToken || !videoData?._id || isLoadingLike) return;

    setIsLoadingLike(true);
    try {
      const response = await LikeService.toggleVideoLike(
        accessToken,
        videoData._id
      );
      
      if (response.statusCode === 200) {
        if (response.data !== null) {
          dispatch(addLikedVideo(response.data));
          setLikeCount((prev) => prev + 1);
        } else {
          dispatch(removeLikedVideo(videoData._id));
          setLikeCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error(
        "Error toggling like:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoadingLike(false);
    }
  }, [accessToken, videoData?._id, dispatch, isLoadingLike]);

  const toggleSubscription = useCallback(async () => {
    if (!accessToken || !owner?._id || isLoadingSubscription) return;

    setIsLoadingSubscription(true);
    try {
      const response = await SubService.toggleSubscription(
        accessToken,
        owner._id
      );

      if (response.data.channel === undefined) {
        dispatch(removeSubscribedChannel(owner._id));
      } else {
        dispatch(addSubscribedChannel(owner._id));
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    } finally {
      setIsLoadingSubscription(false);
    }
  }, [accessToken, owner?._id, dispatch, isLoadingSubscription]);

  // Fetch likes count
  const fetchLikesCount = useCallback(async () => {
    if (!videoData?._id) return;

    try {
      const response = await LikeService.getVideoLikes(videoData._id);
      if (response.statusCode === 200) {
        setLikeCount(response.data.totalLikes || 0);
      }
    } catch (error) {
      console.error("Error fetching likes count:", error.message);
    }
  }, [videoData?._id]);

  // Effects
  useEffect(() => {
    fetchLikesCount();
  }, [fetchLikesCount]);

  // Early return if no video data
  if (!videoData || !owner) {
    return <div className="VI-video-info">Loading...</div>;
  }

  return (
    <div className="VI-video-info">
      <h3 className="title">{title}</h3>
      <div className="VI-channel-info">
        <div className="VI-channel-info-left">
          <div className="VI-profileImg">
            <Link to={`/profile/${owner._id}`}>
              <img src={owner.avatar || ""} alt={`${owner.fullName} avatar`} />
            </Link>
          </div>
          <Link to={`/profile/${owner._id}`} className="VI-channel-name">
            <span className="h3">{owner.fullName}</span>
            <span className="h4">{owner.username}</span>
          </Link>
          {isOwnVideo ? (
            <Link to="/dashboard">
              <button className="subscribe-button">
               Go to Dashboard
              </button>
            </Link>
          ) : (
            <button
              onClick={toggleSubscription}
              disabled={isLoadingSubscription}
              className={`subscribe-button ${
                isChannelSubscribed ? "subscribed" : ""
              }`}
            >
              {isLoadingSubscription
                ? "..."
                : isChannelSubscribed
                ? "Following"
                : "Follow"}
            </button>
          )}
        </div>
        <div className="VI-channel-info-right">
          <div className="VI-likes">
            <button
              className="like-button"
              onClick={toggleLike}
              disabled={isLoadingLike}
              aria-label={isVideoLiked ? "Unlike video" : "Like video"}
            >
              {isVideoLiked ? (
                <BiSolidLike className="like-icon" />
              ) : (
                <BiLike className="like-icon" />
              )}
            </button>
            <h5>
              {likeCount > 0
                ? `${likeCount} like${likeCount !== 1 ? "s" : ""}`
                : "0 likes"}
            </h5>
          </div>
          <div className="VI-share">
            <button className="share-button">
              <PiShareFatLight className="share-icon" /> Share
            </button>
          </div>
          <div>
            <button className="playlist-button">Add To Playlist</button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="VI-statAndDes">
        <div className="VI-statAndDes-v">
          <span>Uploaded: {getTimeAgo(createdAt)}</span>
        </div>
        <div className="separator"></div>
        <p>{displayDescription}</p>
        {shouldShowExpandButton && (
          <button onClick={handleToggle} className="expand-button">
            {isExpanded ? "Show less" : "...more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
