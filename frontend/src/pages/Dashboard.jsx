import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import DashboardService from "../Service/dashboard";
import VideoEditModal from "../components/VideoEditModal";
import Loader from "../components/Loader";
import VideoService from "../Service/video";
import offBtn from "../assets/offBtn.png"
import onBtn from "../assets/onBtn.png"

function Dashboard() {
  const [viewModal, setViewModal] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(null);
  const [viewEditModal, setViewEditModal] = useState(null);
  const [user, setUser] = useState("");
  const [videos, setVideos] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);

  const getChannelStat = async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getChannelStat(accessToken);
      setUser(res.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChannelVideo = async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getChannelVideo(accessToken);
      setVideos(res.data);
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (videoId) => {
    setLoading(true);
    try {
      await VideoService.togglePublishStatus(accessToken, videoId);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    getChannelStat();
  }, [accessToken]);

  useEffect(() => {
    getChannelVideo();
  }, [accessToken]);

  // Modal handlers
  const handleModal = () => setViewModal(true);
  const closeModal = () => setViewModal(false);

  const handleDeleteModal = (videoId) => setViewDeleteModal(videoId);
  const closeDeleteModal = () => setViewDeleteModal(null);

  const handleEditModal = (videoId) => setViewEditModal(videoId);
  const closeEditModal = () => setViewEditModal(null);

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

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <div className="Dashboard-main">
        <nav>
          <div className="Dm-left">
            <h1>Welcome Back, {user?.fullName || "Full Name"}</h1>
            <h5>Seamless Video Management, Elevated Results.</h5>
          </div>
          <div className="Dm-right">
            <button onClick={handleModal}>
              <img src={plus} alt="Upload" />
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
            <h1>{user.totalVideoViews || "000"}</h1>
          </div>
          <div className="Stat">
            <img src={subs} alt="" />
            <h2>Total Subscriber</h2>
            <h1>{user.totalSubscribers || "000"}</h1>
          </div>
          <div className="Stat">
            <img src={like} alt="" />
            <h2>Total Likes</h2>
            <h1>{user.totalLikes || "000"}</h1>
          </div>
        </div>

        <div className="Data-table">
          <div className="Dt-header">
            <div className="cell">Status</div>
            <div className="cell">Upload</div>
            <div className="cell">Likes</div>
            <div className="cell">Date Uploaded</div>
          </div>

          {videos.map((Video) => (
            <div className="Video-data" key={Video?._id}>
              {/* <h4
                className={
                  Video.isPublished ? "video-status-ok" : "video-status"
                }
              >
                {Video.isPublished ? "Published" : "Not Published"}
              </h4> */}
              <div
                  className="toggleBtn"
                  onClick={() => togglePublish(Video?._id)}
                >
                  <img src={Video.isPublished? onBtn : offBtn}  />
                </div>

              <div className="video-detail">
                <img
                  src={Video.thumbnail || "https://via.placeholder.com/150"}
                  alt={Video.title}
                />
                <h3>{shortTitle(Video.title)}</h3>
              </div>

              <div className="video-ratings">
                <div className="likes">
                  <h5>{formatNum(Video.likes || "000")}</h5>
                </div>
              </div>

              <div className="date">{getDate(Video.createdAt)}</div>

              <div className="fuxnBtns">
                
                <div
                  className="deleteBtn"
                  onClick={() => handleDeleteModal(Video?._id)}
                >
                  <img src={bin} alt="Delete" />
                </div>

                <div
                  className="editBtn"
                  onClick={() => handleEditModal(Video?._id)}
                >
                  <img src={edit} alt="Edit" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {viewDeleteModal && (
          <PopupHolder>
            <DeleteVideoModal
              accessToken={accessToken}
              videoId={viewDeleteModal}
              closeDeleteModal={closeDeleteModal}
            />
          </PopupHolder>
        )}

        {viewEditModal && (
          <PopupHolder>
            <VideoEditModal
              accessToken={accessToken}
              videoId={viewEditModal}
              closeEditModal={closeEditModal}
            />
          </PopupHolder>
        )}
      </div>
    </>
  );
}

export default Dashboard;
