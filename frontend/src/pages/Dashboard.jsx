import  { useCallback, useEffect, useRef, useState } from "react";
import "../style/dashboard.css";
import like from "../assets/like.png";
import subs from "../assets/subs.png";
import views from "../assets/views.png";
import bin from "../assets/bin.png";
import edit from "../assets/edit.png";
import PopupHolder from "../components/PopupHolder";
import VideoUploadModal from "../components/VideoUploadModal";
import DeleteVideoModal from "../components/VideoComponents/DeleteVideoModal";
import { useSelector } from "react-redux";
// import DashboardService from "../service/dashboard";
import VideoEditModal from "../components/VideoEditModal";
import Loader from "../components/Loader";
// import VideoService from "../service/video";
import offBtn from "../assets/offBtn.png";
import onBtn from "../assets/onBtn.png";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function Dashboard() {
  const [viewModal, setViewModal] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(null);
  const [viewEditModal, setViewEditModal] = useState(null);
  const [videos, setVideos] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  // const location = useLocation();

  const handleModal = () => {
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal(false);
  };

  const handleDeleteModal = (videoId) => {
    setViewDeleteModal(videoId);
  };

  const closeDeleteModal = () => {
    setViewDeleteModal(null);
  };

  const handleEditModal = (videoId) => {
    setViewEditModal(videoId);
  };

  const closeEditModal = () => {
    setViewEditModal(null);
  };

  // const getDashboardData = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const [userRes, videoRes] = await Promise.all([
  //       DashboardService.getChannelStat(accessToken),
  //       DashboardService.getChannelVideo(accessToken),
  //     ]);
  //     setVideos(videoRes.data);
  //   } catch (error) {
  //     console.error("Error fetching dashboard data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [accessToken]);

  // useEffect(() => {
  //   getDashboardData();
  // }, [getDashboardData]);

  // const togglePublish = async (videoId) => {
  //   setLoading(true);
  //   try {
  //     await VideoService.togglePublishStatus(accessToken, videoId);
  //     setVideos((prevVideos) =>
  //       prevVideos.map((video) =>
  //         video._id === videoId
  //           ? { ...video, isPublished: !video.isPublished }
  //           : video
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error toggling publish status:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const shortTitle = useCallback((title) => {
    return title.length > 42 ? title.substring(0, 42) + " . . ." : title;
  }, []);

  const formatNum = useCallback((count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count;
  }, []);

  const getDate = useCallback((timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }, []);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <h2>Welcome Back, {user?.fullName || "_Name_Space"}</h2>
            <h5>Seamless Video Management, Elevated Results.</h5>
          </div>
          <div className="Dm-right" ref={dropdownRef}>
          <button className="dropdown-button" onClick={() => setOpen(!open)}>
            <FaPlus className="plus-icon" />
        Upload 
        <IoIosArrowDown className={`arrow-icon ${open ? "open" : ""}`} />
      </button>
      {open && (
        <div className="dropdown-content">
          <button onClick={() => alert("Upload Video")}>Upload Video</button>
          <button onClick={() => alert("Upload Photo")}>Upload Photo</button>
          <button onClick={() => ("Upload Post")}>Upload Post</button>
        </div>
      )}
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
          </div>{" "}
          <div className="Stat">
            <img src={views} alt="" />
            <h2>Total Views</h2>
            <h1>{user.totalVideoViews || "000"}</h1>
          </div>{" "}
          <div className="Stat">
            <img src={views} alt="" />
            <h2>Total Views</h2>
            <h1>{user.totalVideoViews || "000"}</h1>
          </div>{" "}
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
              <div
                className="toggleBtn"
                onClick={() => togglePublish(Video?._id)}
              >
                <img src={Video.isPublished ? onBtn : offBtn} />
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
