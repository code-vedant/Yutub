import React, { useEffect, useState } from "react";
import "../style/profile.css";
import VideoContainerForProfile from "../components/VideoContainerForProfile.jsx";
import { useSelector, useDispatch } from "react-redux";
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
import NoPLaylist from "../components/PlaylistComponents/NoPLaylist.jsx";
import NoSubscribers from "../components/SubscriptionComponents/NoSubscribers.jsx";
import NoVideo from "../components/NoVideo.jsx";
import SubService from "../Service/subscription.js";
import Subscribers from "../components/SubscriptionComponents/Subscribers.jsx";
import { addSubscribedChannel, removeSubscribedChannel } from "../store/subsStore.js";

function Profile() {
  const [videos, setVideos] = useState([]);
const [playlist, setPlaylist] = useState([]);
const [tweets, setTweets] = useState([]);
const [subscribed, setSubscribed] = useState([]);
const [subscribers, setSubscribers] = useState([]);
const [user, setUser] = useState(null);
const [isSubscribed, setIsSubscribed] = useState(false);
const [loading, setLoading] = useState(false);
const [activeTab, setActiveTab] = useState("Videos");
const [error, setError] = useState("");

const accessToken = useSelector((state) => state.auth.accessToken);
const userData = useSelector((state) => state.auth.userData);
const subscription = useSelector((state) => state.subscription.subscribedChannels);
const dispatch = useDispatch();
const { id: userId } = useParams();

const handleTabClick = (tab) => setActiveTab(tab);

const fetchData = async () => {
  setLoading(true);
  try {
    const [
      userResponse,
      videoResponse,
      playlistResponse,
      tweetResponse,
      subscribedResponse,
      subscribersResponse,
    ] = await Promise.all([
      AuthService.getUserById(accessToken, userId),
      VideoService.getAllVideos(accessToken),
      PlaylistService.getUserPlaylists(accessToken, userId),
      TweetService.getTweets(accessToken, userId),
      SubService.getSubscribedChannel(accessToken, userId),
      SubService.getSubscibers(accessToken, userId),
    ]);

    setUser(userResponse.data);
    setVideos(videoResponse.data.docs);
    setPlaylist(playlistResponse.data);
    setTweets(tweetResponse.data);
    setSubscribed(subscribedResponse.data.channel);
    setSubscribers(subscribersResponse.data);
  } catch (err) {
    setError("Failed to fetch data. Please try again later.");
    console.error("Error fetching data:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, [userId, accessToken]);

const filteredVideos = useMemo(() => {
  return videos.filter((video) => video.owner === userId && video.isPublished);
}, [videos, userId]);

const toggleSubscription = async () => {
  try {
    const response = await SubService.toggleSubscription(accessToken, userId);
    if (!response.data.channel) {
      dispatch(removeSubscribedChannel(user?._id));
    } else {
      dispatch(addSubscribedChannel(user?._id));
    }
  } catch (error) {
    console.error("Error toggling subscription:", error);
  }
};

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
            user?.coverImage ||
            "https://images.unsplash.com/photo-1515052945961-bbb80118b74b?w=500&auto=format&fit=crop&q=60"
          }
          alt="cover"
        />
      </section>

      <section className="profileDataContainer">
        <div className="profileImage">
          <img
            src={
              user?.avatar ||
              "https://plus.unsplash.com/premium_photo-1668485968673-3e766e0ef0a0?w=500&auto=format&fit=crop&q=60"
            }
            alt="profile"
          />
        </div>
        <div className="profileDetail">
          <h2>{user?.fullName || "John Doe"}</h2>
          <h5>@ {user?.username || "username"}</h5>
          <h4>{subscribers?.length || "0"} Subscribers</h4>
          <h4>{subscribed?.length || "0"} Subscribed</h4>
          <div className="profileubscribeButton">
          <button
            onClick={toggleSubscription}
            className={subscription.includes(user?._id) ? "subscribed" : ""}
          >
            {subscription.includes(user?._id) ? "Unsubscribe" : "Subscribe"}
          </button>
          </div>
          
        </div>
      </section>

      <section className="profilePageList">
        {["Videos", "Playlist", "Tweet", "Subscribers"].map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </section>

      <section className="TabData">
        {activeTab === "Videos" && (
          <div className="VideoTab">
            {filteredVideos.length ? (
              filteredVideos.map((video) => (
                <div key={video.id} className="videoTabItem">
                <Link key={video.id} to={`/videopage/${video?._id}`}>
                  <VideoContainerForProfile video={video} />
                </Link>
                </div>
              ))
            ) : (
              <NoVideo />
            )}
          </div>
        )}

        {activeTab === "Playlist" && (
          <div className="PlaylistTab">
            {playlist.length ? (
              playlist.map((playlist) => (
                <div key={playlist?._id} className="playlistTabItem">
                <Link key={playlist?._id} to={`/playlist/${playlist?._id}`}>
                  <PlaylistComponent playlist={playlist} />
                </Link>
                </div>
              ))
            ) : (
              <NoPLaylist />
            )}
          </div>
        )}

        {activeTab === "Tweet" && (
          <div className="TweetTabContainer">
            {tweets.length ? (
              <TweetTab accessToken={accessToken} user={user} tweets={tweets} />
            ) : (
              <NoTweet />
            )}
          </div>
        )}

        {activeTab === "Subscribers" && (
          <div className="SubscriberTab">
            {subscribers.length ? (
              subscribers.map((subs) =>
                subs.subscriber.map((sub) => (
                  <Subscribers key={sub?._id} subscriber={sub} />
                ))
              )
            ) : (
              <NoSubscribers />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
