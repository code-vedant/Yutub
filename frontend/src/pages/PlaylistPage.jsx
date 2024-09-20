import React, { useEffect, useState } from "react";
import "../style/playlist.style.css";
import VideoBox from "../components/VideoBox";
import PlaylistService from "../Service/playlist";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AuthService from "../Service/auth";

function PlaylistPage() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { id: playlistId } = useParams();

  const [playlist, setPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await PlaylistService.getPlaylistById(
          playlistId,
          accessToken
        );
        if (response) {
          console.log("Data fetched", response.data);
        } else {
          console.log("No data found");
        }
        setPlaylist(response.data);
        setVideo(response.data.videos);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlaylistData();
  }, [playlistId, accessToken]);

  useEffect(() => {
    const getOwnerData = async () => {
      try {
        const response = await AuthService.getUserById(
          accessToken,
          playlist.owner
        );
        setOwner(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOwnerData();
  });

  const removeVideo = async (v) => {
    try {
      await PlaylistService.removeVideo(
        accessToken,
        v,
        playlistId
      );
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="PlaylistPage-main">
      <div className="PP-left">
        <div className="PP-img-holder"></div>
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
          <button className="PP-edit-btn">Edit</button>
          <button className="PP-delete-btn">Delete</button>
        </div>
        <div className="PP-description">
          {playlist.description || "Playlist Description"}
        </div>
      </div>
      <div className="PP-right">
        {video.map((v, index) => (
          <div className="PP-VideoList" key={index}>
            <Link to={`/videopage/${v}`}>
              <VideoBox videoId={v} accessToken={accessToken} />
            </Link>
            <div className="PP-remove" onClick={removeVideo}>
              <h6>Remove</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
