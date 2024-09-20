import React, { useEffect, useState } from "react";
import "../style/profile.css";
import VideoContainerForProfile from "../components/VideoContainerForProfile.jsx";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AuthService from "../Service/auth.js";
import VideoService from "../Service/video.js";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import NoTweet from "../components/TweetComponents/NoTweet.jsx";
import TweetTab from "../components/TweetComponents/TweetTab.jsx";
import TweetService from "../Service/tweet.js";
import PlaylistComponent from "../components/PlaylistComponents/PlaylistComponent.jsx";
import PlaylistService from "../Service/playlist.js";
import NoPLaylist from "../components/NoPLaylist.jsx";

function Profile() {
  const [videos, setVideos] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("")

  const [activeTab, setActiveTab] = useState("Videos");

  const { id: userId } = useParams();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const data = await AuthService.getUserById(accessToken, userId);
      setUser(data.data);
    } catch (error) {
      console.error("Failed to get owner", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await VideoService.getAllVideos(accessToken);
      const { docs } = res.data;
      setVideos(docs);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const videoFilter = () => {
    const filteredVideos = videos.filter((video) => video.owner === userId);
    setVideoList(filteredVideos);
  };

  const getTweet = async () => {
    setError("");
    try {
      setLoading(true);
      const response = await TweetService.getTweets(accessToken,userId);
      setTweets(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      setError(""); 
      setLoading(true);

      try {
        const response = await PlaylistService.getUserPlaylists(accessToken, userId);
        setPlaylist(response.data); 
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to fetch playlists"); 
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPlaylists();
    }
  }, [userId, accessToken]);

  useEffect(() => {
    getTweet();
  },  [userId]);

  useEffect(() => {
    videoFilter();
  }, [videos, userId]);

  useEffect(() => {
    fetchVideos();
  }, [accessToken]);

  useEffect(() => {
    getUser();
  }, [userId]);

  console.log(playlist);
  

  return (
    <div className="profileMain">
      {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <section className="coverImageContainer">
        <img
          src={
            user && user.coverImage
              ? user.coverImage
              : "https://images.unsplash.com/photo-1515052945961-bbb80118b74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
          }
          alt=""
        />
      </section>
      <section className="profileDataContainer">
        <div className="profileImage">
          <div className="profileImageHolder">
            <img
              src={
                user
                  ? user.avatar
                  : "https://plus.unsplash.com/premium_photo-1668485968673-3e766e0ef0a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt=""
            />
          </div>
        </div>
        <div className="profileDetail">
          <div className="profileDetailText">
            <h2>{user ? user.fullName : "John Doe"}</h2>
            <h5>@ {user ? user.username : "username"}</h5>
            <h4>500 Subscribers . 500 Subscribed</h4>
          </div>
          <div className="profileubscribeButton">
            <button>Subscribe</button>
          </div>
        </div>
      </section>
      <section className="profilePageList">
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
      <section className="TabData">
        {activeTab === "Videos" && (
          <div className="VideoTab">
            {videoList.map((video) => (
              <div key={video.id} className="videoTabItem">
                <Link to={`/videopage/${video._id || ""}`}>
                  <VideoContainerForProfile video={video} />
                </Link>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Playlist" && (
          <div className="PlaylistTab">
            {playlist.length > 0 ? playlist.map((playlist) => (
              <div key={playlist._id} className="playlistTabItem">
                <Link to={`/playlist/${playlist._id}`} >
                <PlaylistComponent playlist={playlist}/>
                </Link>
              </div>
            )): <NoPLaylist/> }
          </div>
        )}
        {activeTab === "Tweet" && (
          <div className="TweetTabContainer">
            {tweets.length > 0 ? (
              <TweetTab accessToken={accessToken} user={user} tweets={tweets} />
            ) : (
              <NoTweet />
            )}
          </div>
        )}
      </section>
    </div>
    // <></>
  );
}

export default Profile;
