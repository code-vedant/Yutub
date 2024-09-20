import React from "react";
import "../../style/playlist.style.css";

function PlaylistComponent({ playlist }) {
  console.log(playlist);

  return (
    <div className="PlaylistComponent-main">
      <div className="PC-image">
        <img
          src={
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
          }
          alt="Person using a phone"
        />
      </div>
      <div className="PC-content">
        <h3 className="PC-title">{playlist.name}</h3>
        <p className="PC-description">{playlist.description || ""}</p>
        <div className="PC-footer">
          <span className="PC-playlist">Playlist</span>
          <span className="PC-views">90K Views - 4 hours ago</span>
          <span className="PC-videos">2 videos</span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistComponent;
