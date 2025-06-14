import React, { useEffect, useState } from "react";
import VideoService from "../Service/video.js";
import "../style/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import PopupHolder from "../components/PopupHolder.jsx";
import LikeService from "../Service/like.js";
import LandingPage from "./LandingPage.jsx"
import {
  addLikedComment,
  addLikedTweet,
  addLikedVideo,
} from "../store/LikesSlice.js";
import SubService from "../Service/subscription.js";
import { addSubscribedChannel } from "../store/subsStore.js";
import VideoPage from "../components/HomePage/VideoPage.jsx";
import Header from "../components/HomePage/Header.jsx";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authStatus = useSelector((state => state.auth.status))
  
  const user = useSelector((state) => state.auth.userData);
  console.log(authStatus,accessToken,user);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch videos
      const videoRes = await VideoService.getAllVideos(accessToken);
      setVideos(videoRes.data.docs);

      // Fetch liked videos
      const likedVideosRes = await LikeService.getLikedVideos(accessToken);
      if (likedVideosRes.data && Array.isArray(likedVideosRes.data)) {
        likedVideosRes.data.forEach((videoData) => {
          const videoId = videoData.video?._id;
          dispatch(addLikedVideo(videoId));
        });
      }

      // Fetch liked tweets
      const likedTweetsRes = await LikeService.getLikedTweet(accessToken);
      if (likedTweetsRes.data && Array.isArray(likedTweetsRes.data)) {
        likedTweetsRes.data.forEach((tweetData) => {
          const tweetId = tweetData.tweet?._id;
          dispatch(addLikedTweet(tweetId));
        });
      }

      // Fetch liked comments
      const likedCommentsRes = await LikeService.getLikedComment(accessToken);
      if (likedCommentsRes.data && Array.isArray(likedCommentsRes.data)) {
        likedCommentsRes.data.forEach((comment) => {
          const commentId = comment.tweet?._id;
          dispatch(addLikedComment(commentId));
        });
      }

      // Fetch subscribed channels
      const subscribersRes = await SubService.getSubscribedChannel(
        accessToken,
        user?._id
      );
      if (subscribersRes.data && Array.isArray(subscribersRes.data)) {
        subscribersRes.data.forEach((subData) => {
          if (Array.isArray(subData.channel) && subData.channel.length > 0) {
            subData.channel.forEach((channel) => {
              const channelId = channel?._id;
              dispatch(addSubscribedChannel(channelId));
            });
          }
        });
      }

      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (authStatus && !dataFetched) {
  //     fetchData();
  //   }
  // }, []);

  return (
    <>
      {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      {authStatus && (
          <section className="yutub-home">
            <header>
              <Header />
            </header>
              <VideoPage />
          </section>
      )}
      {!authStatus && (
       <LandingPage />
      )}
    </>
  );
};

export default HomePage;
