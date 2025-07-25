import { IoClose } from "react-icons/io5";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { Link } from "react-router-dom";

export default function PlaylistDetails({ playlist, owner, closeDetailModal,type = "playlist" }) {

  return (
    <div className="detail-modal">
      <button onClick={closeDetailModal} className="detail-close-btn">
        <IoClose className="icon" />
      </button>
      <h3>{playlist.name || "Playlist Title"}</h3>
      {playlist.description && <p>{playlist.description}</p>}
      <p>
        <strong>{`Total ${type === "collection" ? "Photos" : "Videos" } :`} </strong> { type === "collection" ? playlist?.photos?.length : playlist?.videos?.length}
      </p>
      <p>
        <strong>Created by:</strong>{" "}
        <Link to={`/profile/${owner?._id}`}>
          {owner?.fullName || "Unknown"}
        </Link>
      </p>
      <p>
        <strong>Created:</strong> {getTimeAgo(playlist?.createdAt)}
      </p>
    </div>
  );
}
