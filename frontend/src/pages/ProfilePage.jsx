import { useEffect, useMemo, useState } from "react";
import "../style/profile.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthService from "../service/auth.js";
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";
import NoTweet from "../components/TweetComponents/NoTweet.jsx";
import TweetTab from "../components/TweetComponents/TweetTab.jsx";
import PlaylistComponent from "../components/PlaylistComponents/PlaylistComponent.jsx";
import NoPLaylist from "../components/PlaylistComponents/NoPLaylist.jsx";
import NoSubscribers from "../components/SubscriptionComponents/NoSubscribers.jsx";
import SubService from "../service/subscription.js";
import Subscribers from "../components/SubscriptionComponents/Subscribers.jsx";
import { addSubscribedChannel, removeSubscribedChannel } from "../store/subsStore.js";
import cover from "../assets/cover.png";
import coverUser from "../assets/coverUser.jpg";
import alien from "../assets/alien.jpeg";
import LogoutBtn from "../components/LogoutBtn.jsx";
import EditDetails from "../components/Profile/EditDetails.jsx";
import VideoTab from "../components/Profile/VideoTab.jsx";

function Profile() {
  const [playlist, setPlaylist] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [user, setUser] = useState(null);
  const [isSelf, setIsSelf] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Videos");
  const [error, setError] = useState("");
  const [openEdit,setOpenEdit] = useState(false)

  const accessToken = useSelector((state) => state.auth.accessToken);
  const userData = useSelector((state) => state.auth.userData);
  const subscription = useSelector((state) => state.subscription.subscribedChannels);
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const location = useLocation();

  

  const path =
    location.pathname.endsWith("/") && location.pathname !== "/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

  useEffect(() => {
    const fetchUser = async () => {
      if (path === "/profile" || userId === userData?._id) {
        setIsSelf(true);
        setUser(userData);
      } else {
        try {
          const res = await AuthService.getUserById(userId, accessToken);
          setUser(res.data);
          setIsSelf(false);
        } catch (err) {
          console.error("Error fetching user:", err.response.data.message);
        }
      }
    };

    fetchUser();
  }, []);

  const closeModal = () => {
    setOpenEdit(false)
  }

  const handleTabClick = (tab) => setActiveTab(tab);

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

      {openEdit && <PopupHolder>
        <EditDetails closeModal={closeModal}/>
      </PopupHolder>}

      <section className="coverImageContainer">
        <img src={user?.coverImage  ? user.coverImage  : isSelf ? cover : coverUser} alt="cover" />
      </section>

      <section className="profileDataContainer">
        <div className="profileImage">
          <img src={user?.avatar || alien} alt="profile" />
        </div>
        <div className="profileDetail">
          <h2>{user?.fullName || ""}</h2>
          <h3>@{user?.username || ""}</h3>
          <button>View more</button>
          <div className="profileStats">
          <p>{subscribed?.length || "0"} Follows</p>
          <p>{subscribers?.length || "0"} Followers</p>
          </div>
          <div className="profileubscribeButton">
            
            {!isSelf && <button
              onClick={toggleSubscription}
              className={subscription.includes(user?._id) ? "subscribed" : ""}
            >
              {subscription.includes(user?._id) ? "Following" : "Follow"}
            </button>}
            {isSelf && <Link className="dashboard" to={"/dashboard"}>Dashboard</Link>}
            {isSelf && <button onClick={()=>setOpenEdit(true)}>Edit</button>}
            {isSelf && <div>
              <LogoutBtn />
              </div>}
          </div>
        </div>
      </section>

      <ul className="profilePageList">
        {["Videos", "Playlist", "Tweet"].map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <section className="TabData">
        {activeTab === "Videos" && (
          <div className="VideoTab">
            <VideoTab id={user?._id} />
          </div>
        )}

        {activeTab === "Playlist" && (
          <div className="PlaylistTab">
            {playlist.length ? (
              playlist.map((playlist) => (
                <div key={playlist?._id} className="playlistTabItem">
                  <Link to={`/playlist/${playlist?._id}`}>
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
