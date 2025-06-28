import "../../style/deleteVideo.css";
import VideoService from "../../service/video";

function DeleteVideoModal({closeDeleteModal, videoId ,accessToken }) {


  const deleteVideo =async ()=> {
      try {
        await VideoService.deleteVideo(accessToken,videoId)
        closeDeleteModal();
      } catch (error) {
        console.error(error.response.data.message);
        
      }
  }


  return (
    <section className="DV-main">
      <div className="DV-head">
        <div className="DV-head-left">
          </div>
        <div className="DV-head-right">
          <div className="top">
            <h2>Delete Video</h2>
            <div className="closeBtn" onClick={closeDeleteModal}>
            </div>
          </div>
          <p>
            Are you sure you want to delete this video? Once its deleted, you
            will not be able to recover it.
          </p>
        </div>
      </div>
      <div className="DV-body">
      <div className="DV-btns">
            <button type="cancel" className="CancelBtn" onClick={closeDeleteModal}>Cancel</button>
            <button type="submit" onClick={()=> {deleteVideo()}} >Delete</button>
          </div>
      </div>
    </section>
  );
}

export default DeleteVideoModal;
