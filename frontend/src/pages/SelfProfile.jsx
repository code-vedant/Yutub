import React, { useCallback, useEffect, useState } from "react";
import "../style/selfProfile.css";
import VideoContainer from "../components/VideoContainer";
import NoVideo from "../components/NoVideo";
import NoPLaylist from "../components/NoPLaylist";
import NoTweet from "../components/NoTweet";
import EditDetails from "../components/EditDetails";
import PopupHolder from "../components/PopupHolder";
import { Link } from "react-router-dom";
import login from "../store/userAuth.js";
import selectUser from "../store/userAuth.js";
import { useSelector } from "react-redux";
import AuthService from "../Service/auth.js";


function SelfProfile() {
  const [activeTab, setActiveTab] = useState("Videos");
  const [viewModal, setViewModal] = useState(false);
  const [user, setUser] = useState();
  const accessToken = useSelector((state) => state.auth.accessToken);


  const handleModal = () => {
    setViewModal(true);
  };
  const closeModal = () => {
    setViewModal(false);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // console.log(login.userData)
  const fetchUserData = useCallback(async () => {
    if (accessToken) {
      try {
        const userData = await AuthService.getUserData(accessToken);
        setUser(userData.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    }
  }, [accessToken]); // Depend on accessToken

  // Optionally, call the callback function when needed
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

   console.log(user);
   


  
  


  const videos = [
    // { id: 1, title: 'Video 1', thumbnail: 'https://images.unsplash.com/photo-1716237442748-795f6343ad94?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // { id: 2, title: 'Video 2', thumbnail: 'https://images.unsplash.com/photo-1684283245069-2913795d7989?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D' },
    // { id: 3, title: 'Video 3', thumbnail: 'https://images.unsplash.com/photo-1675205199255-b54799d7c3cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // { id: 4, title: 'Video 4', thumbnail: 'https://images.unsplash.com/photo-1690381513681-dd95eb359065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D' },
    // { id: 5, title: 'Video 5', thumbnail: 'https://images.unsplash.com/photo-1659293554631-d7a38642c5e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D' },
    // { id: 6, title: 'Video 6', thumbnail: 'https://images.unsplash.com/photo-1514626585111-9aa86183ac98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2V8ZW58MHx8MHx8fDA%3D' },
    // { id: 7, title: 'Video 7', thumbnail: 'https://images.unsplash.com/photo-1719425061819-8b9e20db67ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
    // { id: 8, title: 'Video 8', thumbnail: 'https://images.unsplash.com/photo-1675205199255-b54799d7c3cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // { id: 9, title: 'Video 9', thumbnail: 'https://plus.unsplash.com/premium_photo-1720884610406-a1f4f61c8853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D' },
    // //...
  ];

  const tweets = [
    // {
    //   id: 1,
    //   content:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque vel sapien scelerisque pellentesque. Sed ac felis ac lectus malesuada tincidunt. Sed euismod urna eu odio facilisis, vel consectetur nunc ullamcorper. Integer euismod nisi vel massa pulvinar, vel consectetur lacus consectetur.",
    // },
    // {
    //   id: 2,
    //   content:
    //     "Donec vitae velit vel libero gravida consectetur. Sed consectetur, velit non eleifend maximus, arcu ex vulputate nisi, at consectetur justo arcu euismod lectus. Sed quis eros sed nunc ornare consectetur vitae vel neque.",
    // },
    // {
    //   id: 3,
    //   content:" Lorem ipsum dolor sit amet."
    // },
  ];

  return (
    <div className="selfProfileMain">
      {viewModal && (
        <PopupHolder closeModal={closeModal}>
          <EditDetails closeModal={closeModal}/>
        </PopupHolder>
      )}
      <section className="selfcoverImageContainer">
        <img
          src="https://images.unsplash.com/photo-1515052945961-bbb80118b74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbmRzY2FwZSUyMGdpcmx8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </section>
      <section className="selfprofileDataContainer">
        <div className="selfprofileImage">
          <div className="selfprofileImageHolder">
            <img
              src={user?.avatar || ""}
              alt=""
            />
          </div>
        </div>
        <div className="selfprofileDetail">
          <div className="selfprofileDetailText">
            <h2>{user?.fullName || 'User Name'}</h2>
            <h5>@{user?.username || 'Not available'}</h5>
            <h4>151345461 Subscribers</h4>
            <h4>500 Subscribered</h4>
          </div>
          <div className="selfprofileubscribeButton">
            <button onClick={handleModal}>Edit</button>
            <Link to="/dashboard" >
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
            {videos.length ? (
              <div className="SPVideoTab">
                {videos.map((video) => (
                  <div key={video.id} className="SPvideoTabItem">
                    <VideoContainer video={video} />
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
            {videos.length ? (
              <div className="SPPlaylistTab">
                {videos.map((video) => (
                  <div key={video.id} className="videoTabItem">
                    <VideoContainer video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <NoPLaylist />
            )}
          </div>
        )}

        {activeTab === "Tweet" && (
          <div className="TweetTabContainer">
            {tweets.length ? (
              <div className="TweetTab">
                {tweets.map((tweet) => (
                  <div key={tweet.id} className="TweetItem">
                    <p>{tweet.content}</p>
                    <span>{tweet.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <NoTweet />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default SelfProfile;
