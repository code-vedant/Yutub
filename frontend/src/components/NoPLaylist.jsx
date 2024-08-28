import React from "react";
import playlist from "../assets/playlist.png";
import "../style/SmallComponents.css";

function NoPLaylist() {
  return (
    <div className="NoContent">
      <div className="NCimgHolder">
        <img src={playlist} alt="No playlists" />
      </div>
      <div className="NCtext">
        <h5>No playlists available</h5>
        <p>
          This page has yet to upload any playlists. Search another page to find
          more playlists.
        </p>
      </div>
    </div>
  );
}

export default NoPLaylist;
