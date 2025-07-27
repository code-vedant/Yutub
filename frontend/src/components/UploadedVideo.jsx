import { IoClose } from "react-icons/io5";
import checkMark from "../assets/checkMark.png"

function UploadedVideo({ closeFn }) {
  return (
    <div className="UploadedVideo-main">
      <p>Video Uploaded</p>
      <img src={checkMark} alt="Checkmark" className="checkmark-animate" />
      <p>successfully</p>
      <button onClick={closeFn}>
        <IoClose/>
      </button>
    </div>
  );
}


export default UploadedVideo