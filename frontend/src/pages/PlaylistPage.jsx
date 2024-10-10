import React, { useEffect, useState } from "react";
import "../style/playlist.style.css";
import VideoBox from "../components/VideoBox";
import PlaylistService from "../Service/playlist";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AuthService from "../Service/auth";
import PopupHolder from "../components/PopupHolder";
import DeletePlaylist from "../components/PlaylistComponents/DeletePlaylist";
import UpdatePlaylist from "../components/PlaylistComponents/UpdatePlaylist";

function PlaylistPage() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);

  const { id: playlistId } = useParams();

  const [playlist, setPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [videos, setVideos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);

  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  useEffect(() => {
    const getPlaylistData = async () => {
      setLoading(true);
      try {
        const response = await PlaylistService.getPlaylistById(
          playlistId,
          accessToken
        );
        const playlistData = response.data;
        setPlaylist(playlistData);
        setVideos(playlistData.videos);

        const ownerResponse = await AuthService.getUserById(
          accessToken,
          playlistData.owner
        );
        setOwner(ownerResponse.data);
      } catch (error) {
        console.error("Error fetching playlist or owner data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getPlaylistData();
  }, [playlistId, accessToken]);

  const removeVideo = async (videoId) => {
    try {
      await PlaylistService.removeVideo(accessToken, videoId, playlistId);

      setVideos((prevVideos) => prevVideos.filter((v) => v._id !== videoId));
    } catch (error) {
      console.error("Error removing video:", error.message);
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}

      <div className="PlaylistPage-main">
        <div className="PP-left">
          <div className="PP-img-holder">
            <img
              src={
                "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
            />
          </div>
          <div className="PP-title">{playlist.name || "Playlist Title"}</div>
          <div className="PP-owner">
            <div className="PP-owner-img">
              <img src={owner?.avatar} alt="" />
            </div>
            <h3>{owner.fullName || "Owner name"}</h3>
          </div>
          <div className="PP-stats">
            <h5> 12 videos 100k views</h5>
          </div>
          <div className="PP-edits">
            <button className="PP-edit-btn" onClick={handleEditModal}>
              Edit
            </button>
            <button className="PP-delete-btn" onClick={handleDeleteModal}>
              Delete
            </button>
          </div>
          <div className="PP-description">
            {playlist.description || "Playlist Description"}
          </div>
        </div>
        <div className="PP-right">
          {videos.map((v, index) => (
            <div className="PP-VideoList" key={index}>
              <Link to={`/videopage/${v}`}>
                <VideoBox videoId={v} accessToken={accessToken} />
              </Link>
              {owner?._id === user?._id && (
                <div className="PP-remove" onClick={() => removeVideo(v)}>
                  <h6>Remove</h6>
                </div>
              )}
            </div>
          ))}
        </div>
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
