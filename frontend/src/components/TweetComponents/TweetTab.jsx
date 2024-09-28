import React, { useEffect, useState } from "react";
import "../../style/tweet.style.css";
import robot from "../../assets/robot.png";
import like from "../../assets/like.png";
import liked from "../../assets/liked.png";
import LikeService from "../../Service/like.js";
import { useDispatch, useSelector } from "react-redux";
import dots from "../../assets/dots.png";
import PopupHolder from "../PopupHolder.jsx"
import EditTweetModal from "./EditTweetModal.jsx"
import DeleteTweet from "./DeleteTweet.jsx";
import { addLikedTweet, removeLikedTweet } from "../../store/LikesSlice.js";
function TweetTab({accessToken,tweets,user}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();


  const toggleLike = async (tweetId) => {
    try {
      const response = await LikeService.toggleTweetLike(accessToken, tweetId);
      if (response.success) {
        if (response.data === null) {
          dispatch(removeLikedTweet(tweetId));
        } else {
          dispatch(addLikedTweet(tweetId));
        }
      } else {
        console.error("Failed to toggle like:", response.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const Likedtweets = useSelector((state)=> state.like.likedTweets)
  


  const handleEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        tweets.map((tweet) => {

          const likeCount = tweet.likes || 0;

          return (
            <div className="tweet-tab-main" key={tweet._id}>
              <div className="ttm-left">
                <div className="ttm-left-imgHolder">
                  {user ? (
                    <img
                      src={user.avatar}
                      className="imgRec"
                      alt="user avatar"
                    />
                  ) : (
                    <img src={robot} alt="default avatar" />
                  )}
                </div>
              </div>
              <div className="ttm-right">
                <div className="ttm-right-head">
                  <div className="ttm-right-head-user">
                  <h2>{user.fullName || "Name"}</h2>
                  <h4>{timeAgo(tweet.createdAt) || "x days ago"}</h4>
                  </div>
                  {user._id === userData._id && (
                    <div className="edit-tweet-container">
                      <div className="etc-icon">
                        <img src={dots} alt="" />
                      </div>
                      <div className="etc-options">
                        <button onClick={handleEditModal}>Edit</button>
                        <button onClick={handleDeleteModal}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ttm-right-body">
                  <p>
                    {tweet.content ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                  </p>
                  <div className="ttm-right-footer">
                    <div className="ttm-footer-box">
                      <div className="ttm-right-imgHolder">
                        <img
                          src={Likedtweets.includes(tweet._id) ? liked : like}
                          alt="like"
                          onClick={() => toggleLike(tweet._id)}
                        />
                      </div>
                      <h5>{likeCount}</h5>
                    </div>
                  </div>
                </div>
              </div>
              {editModal && (
                <PopupHolder>
                  <EditTweetModal closeEditModal={closeEditModal} accessToken={accessToken} tweetId={tweet._id}/>
                </PopupHolder>
              )}
              {deleteModal && (
                <PopupHolder>
                  <DeleteTweet closeDeleteModal={closeDeleteModal} accessToken={accessToken} tweetId={tweet._id}/>
                </PopupHolder>
              )}
              
            </div>
            
          );
        })
      )}
    </>
  );
}

export default TweetTab;
