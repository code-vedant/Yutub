import React, { useState } from "react";
import "../style/dashboard.css";
import plus from "../assets/plus.png";
import like from "../assets/like.png";
import subs from "../assets/subs.png";
import views from "../assets/views.png";
import bin from "../assets/bin.png";
import edit from "../assets/edit.png";
import PopupHolder from "../components/PopupHolder";
import VideoUploadModal from "../components/VideoUploadModal";
import DeleteVideoModal from "../components/DeleteVideoModal";

function Dashboard() {
  const [viewModal, setViewModal] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(null);

  const Video = [
    {
      id: 1,
      title: "Title 1",
      views: 123456789,
      likes: 12349,
      dislikes: 123,
      channelName: "Channel Name 1",
      date: "2022-01-01",
      duration: "1:23:45",
      comments: 1234,
      description: "Description 1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      subscribed: true,
    },
    {
      id: 2,
      title: "Title 2 sda  skjnkf awskdcsnk sdkjsdnsd sajkns nwnjen",
      views: 987654321,
      likes: 98765,
      dislikes: 9871,
      channelName: "Channel Name 2",
      date: "2022-02-02",
      duration: "2:34:56",
      comments: 9876,
      description: "Description 2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      subscribed: false,
    },
    {
      id: 3,
      title: "Title 3",
      views: 321456789,
      likes: 32145,
      dislikes: 321,
      channelName: "Channel Name 3",
      date: "2022-03-03",
      duration: "3:45:67",
      comments: 3214,
      description: "Description 3",
      thumbnail: "https://example.com/thumbnail3.jpg",
      subscribed: true,
    },
    {
      id: 4,
      title: "Title 2",
      views: 987654321,
      likes: 98765,
      dislikes: 9871,
      channelName: "Channel Name 2",
      date: "2022-02-02",
      duration: "2:34:56",
      comments: 9876,
      description: "Description 2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      subscribed: true,
    },
    {
      id: 5,
      title: "Title 3",
      views: 321456789,
      likes: 32145,
      dislikes: 321,
      channelName: "Channel Name 3",
      date: "2022-03-03",
      duration: "3:45:67",
      comments: 3214,
      description: "Description 3",
      thumbnail: "https://example.com/thumbnail3.jpg",
      subscribed: true,
    },
    {
      id: 6,
      title: "Title 1",
      views: 123456789,
      likes: 12349,
      dislikes: 123,
      channelName: "Channel Name 1",
      date: "2022-01-01",
      duration: "1:23:45",
      comments: 1234,
      description: "Description 1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      subscribed: true,
    },
    {
      id: 7,
      title: "Title 2",
      views: 987654321,
      likes: 98765,
      dislikes: 9871,
      channelName: "Channel Name 2",
      date: "2022-02-02",
      duration: "2:34:56",
      comments: 9876,
      description: "Description 2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      subscribed: false,
    },
    {
      id: 8,
      title: "Title 3",
      views: 321456789,
      likes: 32145,
      dislikes: 321,
      channelName: "Channel Name 3",
      date: "2022-03-03",
      duration: "3:45:67",
      comments: 3214,
      description: "Description 3",
      thumbnail: "https://example.com/thumbnail3.jpg",
      subscribed: false,
    },
    {
      id: 9,
      title: "Title 1",
      views: 123456789,
      likes: 12349,
      dislikes: 123,
      channelName: "Channel Name 1",
      date: "2022-01-01",
      duration: "1:23:45",
      comments: 1234,
      description: "Description 1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      subscribed: true,
    },
    {
      id: 10,
      title: "Title 2",
      views: 987654321,
      likes: 98765,
      dislikes: 9871,
      channelName: "Channel Name 2",
      date: "2022-02-02",
      duration: "2:34:56",
      comments: 9876,
      description: "Description 2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      subscribed: false,
    },
  ].map((video) => ({
    ...video,
    title: shortTitle(video.title),
    likes: formatNum(video.likes),
    dislikes: formatNum(video.dislikes),
  }));

  const handleModal = () => {
    setViewModal(true);
  };
  const closeModal = () => {
    setViewModal(false);
  };

  const handleDeleteModal = (id) => {
    setViewDeleteModal(id);
  };
  const closeDeleteModal = () => {
    setViewDeleteModal(null);
  };

  function shortTitle(title) {
    if (title.length > 42) {
      return title.substring(0, 42) + " . . .";
    }
    return title;
  }

  function formatNum(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count;
    }
  }

  // for (var i = 0; i < Video.length; i++) {
  //   Video[i].likes = formatNum(Video[i].likes);
  //   Video[i].dislikes = formatNum(Video[i].dislikes);
  //   Video[i].title = shortTitle(Video[i].title);
  // }

  return (
    <>
      <div className="Dashboard-main">
        <nav>
          <div className="Dm-left">
            <h1>Welcome Back, Channel Name</h1>
            <h5>Seamless Video Management, Elevated Results.</h5>
          </div>
          <div className="Dm-right">
            <button onClick={handleModal}>
              <img src={plus} />
              Upload Video
            </button>
          </div>
          {viewModal && (
            <PopupHolder closeModal={closeModal}>
              <VideoUploadModal closeModal={closeModal} />
            </PopupHolder>
          )}
        </nav>
        <div className="Separator"></div>
        <div className="Stats">
          <div className="Stat">
            <img src={views} alt="" />
            <h2>Total Views</h2>
            <h1>45,272,554</h1>
          </div>
          <div className="Stat">
            <img src={subs} alt="" />
            <h2>Total Subscriber</h2>
            <h1>45,272,554</h1>
          </div>
          <div className="Stat">
            <img src={like} alt="" />
            <h2>Total Likes</h2>
            <h1>45,272,554</h1>
          </div>
        </div>
        {/* <div className="Separator"></div> */}
        <div className="Data-table">
          <div className="Dt-header">
            <div className="cell">Status</div>
            <div className="cell">Upload</div>
            <div className="cell">Ratings</div>
            <div className="cell">Date Uploaded</div>
          </div>
          {Video.map((Video) => (
            <div className="Video-data" key={Video.id}>
              {Video.subscribed ? (
                <h4 className="video-status-ok">Published</h4>
              ) : (
                <h4 className="video-status">Not Published</h4>
              )}
              <div className="video-detail">
                <img
                  src="https://images.unsplash.com/photo-1716237442748-795f6343ad94?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <h3>{Video.title}</h3>
              </div>
              <div className="video-ratings">
                <div className="likes">
                  <h5>{Video.likes} likes</h5>
                </div>
                <div className="dislikes">
                  <h5>{Video.dislikes} dislikes</h5>
                </div>
              </div>
              <div className="date">12/02/2024</div>
              <div className="fuxnBtns">
                
                <div className="deleteBtn">
                
                  <img src={bin} alt="" onClick={()=>handleDeleteModal(Video.id)} key={Video.id}/>
                </div>
                <div className="editBtn">
                  <img src={edit} alt="" />
                </div>
              </div>
              {viewDeleteModal === Video.id && <PopupHolder>
                  <DeleteVideoModal closeDeleteModal={closeDeleteModal}/>
                  </PopupHolder>}
            </div>
            
          ))}
                
        </div>
      </div>
    </>
  );
}

export default Dashboard;
