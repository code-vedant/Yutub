import { useEffect, useState } from "react";
import "../style/playlist.style.css";
import VideoBox from "../components/VideoComponents/VideoBox";
import PlaylistService from "../service/playlist";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AuthService from "../service/auth";
import PopupHolder from "../components/PopupHolder";
import DeletePlaylist from "../components/PlaylistComponents/DeletePlaylist";
import UpdatePlaylist from "../components/PlaylistComponents/UpdatePlaylist";
import NoVideo from "../components/Profile/NoVideo";
import { BsThreeDotsVertical } from "react-icons/bs";
import PlaylistDetails from "../components/modals/PlaylistDetails";

function PlaylistPage() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => setShowOptions((prev) => !prev);

  const { id: playlistId } = useParams();

  const [playlist, setPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [videos, setVideos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detailModel, setDetailModal] = useState(false);

  const handleEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);

  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleDetailModal = () => setDetailModal(true);
  const closeDetailModal = () => setDetailModal(false);

  useEffect(() => {
    const getPlaylistData = async () => {
      setLoading(true);
      try {
        const response = await PlaylistService.getPlaylistById(playlistId);
        const playlistData = response.data;
        setPlaylist(playlistData);
        setVideos(playlistData.videos);
        const ownerResponse = await AuthService.getUserById(playlistData.owner);
        setOwner(ownerResponse.data);
      } catch (error) {
        console.error("Error fetching playlist or owner data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getPlaylistData();
  }, [playlistId]);

  const removeVideo = async (videoId) => {
    try {
      const res = await PlaylistService.removeVideo(accessToken, videoId, playlistId);
      if(res.status == 200)
        setVideos((prevVideos) => prevVideos.filter((v) => v._id !== videoId));
    } catch (error) {
      console.error("Error removing video:", error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".PP-options")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}

      <div className="PlaylistPage-main">
        <div className="PP-left">
          <div className="PP-title">
            <h3>{playlist.name || "Playlist Title"}</h3>
            <h5>{owner.fullName}</h5>
          </div>
          <div className="PP-options">
            <BsThreeDotsVertical className="icon" onClick={toggleOptions} />
            {showOptions && (
              <ul className="PP-edits">
                <li className="PP-btn" onClick={handleDetailModal}>
                  Details
                </li>
                <li className="PP-btn" onClick={handleEditModal}>
                  Edit
                </li>
                <li className="PP-btn" onClick={handleDeleteModal}>
                  Delete
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="PP-right">
          {videos?.length > 0 ? (
            videos?.map((vidId, index) => (
              <div className="PP-VideoList" key={index}>
                  <VideoBox
                    videoId={vidId}
                    playlistOwnerId={owner?._id}
                    currentUserId={user?._id}
                    removeFn={removeVideo}
                  />
              </div>
            ))
          ) : (
            <NoVideo />
          )}
        </div>
        {detailModel && (
          <PopupHolder>
            <PlaylistDetails
              playlist={playlist}
              owner={owner}
              closeDetailModal={closeDetailModal}
            />
          </PopupHolder>
        )}
        {editModal && (
          <PopupHolder>
            <UpdatePlaylist
              closeEditModal={closeEditModal}
              accessToken={accessToken}
              playlistId={playlistId}
            />
          </PopupHolder>
        )}
        {deleteModal && (
          <PopupHolder>
            <DeletePlaylist
              closeDeleteModal={closeDeleteModal}
              accessToken={accessToken}
              playlistId={playlistId}
            />
          </PopupHolder>
        )}
      </div>
    </>
  );
}

export default PlaylistPage;
