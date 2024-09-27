import React, { useCallback, useContext, useEffect, useState } from "react";
import "../style/selfProfile.css";
import VideoContainerForProfile from "../components/VideoContainerForProfile";
import NoVideo from "../components/NoVideo";
import NoPLaylist from "../components/PlaylistComponents/NoPLaylist.jsx";
import NoTweet from "../components/TweetComponents/NoTweet.jsx";
import TweetTab from "../components/TweetComponents/TweetTab.jsx";
import PostTweet from "../components/TweetComponents/PostTweet.jsx";
import EditDetails from "../components/EditDetails";
import PopupHolder from "../components/PopupHolder";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../Service/auth.js";
import NoSubscribers from "../components/SubscriptionComponents/NoSubscribers.jsx";
import VideoService from "../Service/video.js";
import DashboardService from "../Service/dashboard.js";
import Loader from "../components/Loader.jsx";

import TweetService from "../Service/tweet.js";
import PlaylistService from "../Service/playlist.js";
import PlaylistComponent from "../components/PlaylistComponents/PlaylistComponent.jsx";
import CreatePlaylist from "../components/PlaylistComponents/CreatePlaylist.jsx";
import Subscribers from "../components/SubscriptionComponents/Subscribers.jsx";

function SelfProfile() {
  const [activeTab, setActiveTab] = useState("Videos");
  const [viewModal, setViewModal] = useState(false);
  const [videoFinal, setVideoFinal] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [createPlayistModal, setCreatePlayistModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  const accessToken = useSelector((state) => state.auth.accessToken); // Get accessToken from Redux store

  const handleModal = () => {
    setViewModal(true);
  };
  const closeModal = () => {
    setViewModal(false);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreatePlaylistModal = () => {
    setCreatePlayistModal(true);
  };
  const closeCreatePlaylistModal = () => {
    setCreatePlayistModal(false);
  };



  const fetchUserData = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    if (!accessToken) {
      setError("No access token available.");
      return;
    }
    try {
      const response = await AuthService.getUserData(accessToken);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      setError(error.message ? error.message : "Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const getChannelVideo = async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getChannelVideo(accessToken);
      setVideoFinal(res.data);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };
  const getTweet = async () => {
    setError("");
    try {
      const { _id: userId } = user;
      setLoading(true);
      const response = await TweetService.getTweets(accessToken, userId);
      setTweets(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };
  const { _id: userId } = user;

  const fetchPlaylists = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await PlaylistService.getUserPlaylists(
        accessToken,
        userId
      );
      setPlaylist(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch playlists");
      setLoading(false);
    } 
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await SubService.getSubscribedChannel(
          accessToken,
          userId
        );
        setSubscribers(response.data.channel);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch subscribers");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [userId]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await SubService.getSubscibers(accessToken, userId)
        setSubscribers(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch subscribers");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [accessToken]);


  useEffect(() => {
    fetchPlaylists();
  }, [userId, accessToken]);

  useEffect(() => {
    getTweet();
  }, [accessToken, user._id]);

  useEffect(() => {
    getChannelVideo();
  }, [accessToken]);

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  return (
    <div className="selfProfileMain">
      {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      {viewModal && (
        <PopupHolder closeModal={closeModal}>
          <EditDetails closeModal={closeModal} />
        </PopupHolder>
      )}
      <section className="selfcoverImageContainer">
        <img
          src={
            user?.coverImage
              ? user.coverImage
              : "https://images.unsplash.com/photo-1515052945961-bbb80118b74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
          }
          alt=""
        />
      </section>
      <section className="selfprofileDataContainer">
        <div className="selfprofileImage">
          <div className="selfprofileImageHolder">
            <img src={user?.avatar || ""} alt="" />
          </div>
        </div>
        <div className="selfprofileDetail">
          <div className="selfprofileDetailText">
            <h2>{user?.fullName || "Full Name"}</h2>
            <h5>@{user?.username || "username"}</h5>
            <h4>{subscribers?.length || "0" }&nbsp;Subscribers </h4>
            <h4>{subscribed?.length || "0"}&nbsp;Subscribed</h4>
          </div>
          <div className="selfprofileubscribeButton">
            <button onClick={handleModal}>Edit</button>
            <Link to="/dashboard">
              <button>Go to Dasboard</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="selfprofilePageList">
        <ul>
          {["Videos", "Playlist", "Tweet", "Subscribed"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </section>

      <section className="SPTabData">
        {activeTab === "Videos" && (
          <div className="SPVideoTabContainer">
            {videoFinal.length ? (
              <div className="SPVideoTab">
                {videoFinal.map((video) => (
                  <div key={video.id} className="SPvideoTabItem">
                    <Link to={`/videopage/${video._id}`}>
                      <VideoContainerForProfile video={video} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <NoVideo />
              </>
            )}
          </div>
        )}
        
        {activeTab === "Playlist" && (
          <div className="SPPlaylistTabContainer">
            <div className="CreateButton">
            <button onClick={handleCreatePlaylistModal}>
              Create Playlist
            </button>
            </div>

            {playlist.length > 0 ? (
              <div className="SPPlaylistTab">
                {playlist.map((playlist) => (
                  <div key={playlist._id} className="SPplaylistTabItem">
                    <PlaylistComponent playlist={playlist} />
                  </div>
                ))}
              </div>
            ) : (
              <NoPLaylist />
            )}
          </div>
        )}

        {activeTab === "Tweet" && (
          <div className="SPTweetTabContainer">
            <PostTweet accessToken={accessToken} />
            {tweets.length ? (
              <TweetTab accessToken={accessToken} user={user} tweets={tweets} />
            ) : (
              <NoTweet />
            )}
          </div>
        )}
        {activeTab === "Subscribers" && (
          <div className="SubscriberTab">
            {subscribers?.length > 0 ? (
              subscribers.map((subs) =>
                subs.subscriber.map((sub) => (
                  <Subscribers key={sub._id} subscriber={sub} />
                ))
              )
            ) : (
              <NoSubscribers />
            )}
          </div>
        )}
      </section>
      {
        createPlayistModal && <PopupHolder>
          <CreatePlaylist closeCreatePlaylistModal={closeCreatePlaylistModal} accessToken={accessToken}/>
        </PopupHolder>
      }
    </div>
  );
}

export default SelfProfile;
