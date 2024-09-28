import React from "react";
import bin from "../assets/bin.png";
import "../style/deleteVideo.css";
import plus from "../assets/plus.png";
import VideoService from "../Service/video";

function DeleteVideoModal({closeDeleteModal, videoId ,accessToken }) {


  const deleteVideo =async ()=> {
      try {
        await VideoService.deleteVideo(accessToken,videoId)
        closeDeleteModal();
      } catch (error) {
        console.log(error.message);
        
      }
  }


  return (
    <section className="DV-main">
      <div className="DV-head">
        <div className="DV-head-left">
          <img src={bin} alt="" />
          </div>
        <div className="DV-head-right">
          <div className="top">
            <h2>Delete Video</h2>
            <div className="closeBtn" onClick={closeDeleteModal}>
              <img src={plus} alt="" />
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
