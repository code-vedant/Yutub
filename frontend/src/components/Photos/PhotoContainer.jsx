import { Link } from "react-router-dom";
import "../../style/photoContainer.css";
import { CiBookmark } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";

export default function PhotoContainer({ photo }) {
  return (
    <div className="photo-container">
      <img src={photo.photoFile} alt="" />
      <div className="photo-options">
        <button>
          <CiBookmark />
        </button>
        <button>
          <IoHeartOutline />
        </button>
      </div>

      <div className="photo-info">
        <div className="photo-info-btm">
          <div className="photo-info-btm-left">
            <img src={photo.owner.avatar} alt="" />
          </div>
          <div className="photo-info-btm-right">
            <h3>{photo.title}</h3>
            <Link to={`/profile/${photo.owner._id}`}>
              @{photo.owner.username}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
