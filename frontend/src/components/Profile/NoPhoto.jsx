import "../../style/SmallComponents.css";
import play from "../../assets/play.png";


function NoPhoto() {
  return (
    <div className="NoContent">
      <div className="NCimgHolder">
        <img src={play} alt="No videos" />
      </div>
      <div className="NCtext">
        <h5>No Photo uploaded</h5>
        <p>
          This page has yet to upload a video. Search another page in order to
          find more videos.
        </p>
      </div>
    </div>
  );
}

export default NoPhoto;
