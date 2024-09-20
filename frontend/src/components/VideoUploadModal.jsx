import React, { useRef, useState } from "react";
import "../style/videoUploadPage.css";
import { useForm } from "react-hook-form";
import upload from "../assets/upload.png";
import VideoService from "../Service/video";
import { useSelector } from "react-redux";
import PopupHolder from "./PopupHolder";
import UploadingModal from "./UploadingModal";
import UploadedVideo from "./UploadedVideo";

function VideoUploadModal({ closeModal }) {
  const { register, handleSubmit } = useForm();
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);

  function handleVideoInputChange() {
    videoInputRef.current.click();
  }

  function handleThumbnailInputChange() {
    thumbnailInputRef.current.click();
  }

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const uploadVideo = async (data) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", video);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await VideoService.uploadVideo(accessToken, formData);
      setIsUploading(false);
      setIsUploaded(true);
      if (res) {
        console.log("Video uploaded successfully", res.data);
      }
    } catch (error) {
      console.error("Error uploading video");
      setIsUploading(false);
    }
  };

  return (
    <section className="VideoUploadmain">
      {isUploaded && (
        <PopupHolder>
          <UploadedVideo closeModal={closeModal} />
        </PopupHolder>
      )}
      {isUploading && (
        <PopupHolder>
          <UploadingModal />
        </PopupHolder>
      )}
      <div className="VU-head">
        <h1>Upload Video</h1>
      </div>
      <div className="VU-Body">
        <form onSubmit={handleSubmit(uploadVideo)}>
          <div className="VU-Form">
            <label>Title:</label>
            <input type="text" {...register("title")} />
            <label>Description:</label>
            <textarea {...register("description")} />
          </div>
          <div className="VU-Graphics">
            <div className="VU-imageHolder">
              <div className="VU-VideoContainer">
                {video ? (
                  <div className="afterVideoUpload">
                    <video
                      src={URL.createObjectURL(video)}
                      controls
                      muted
                      onClick={handleVideoInputChange}
                    />
                  </div>
                ) : (
                  <div className="beforeVideoUpload">
                    <img
                      src={upload}
                      onClick={handleVideoInputChange}
                      alt="upload Video"
                    />
                    <h3>Upload Video</h3>
                  </div>
                )}
              </div>
              <div className="VU-ThumbnailContainer">
                {thumbnail ? (
                  <div
                    className="afterUpload"
                    onClick={handleThumbnailInputChange}
                  >
                    <img src={URL.createObjectURL(thumbnail)} alt="" />
                  </div>
                ) : (
                  <div className="beforeUpload">
                    <img
                      src={upload}
                      onClick={handleThumbnailInputChange}
                      alt="upload thumbnail"
                    />
                    <h3>Add Thumbnail</h3>
                  </div>
                )}
              </div>
            </div>
            <div className="VU-btns">
              <button type="cancel" className="CancelBtn" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit">Upload</button>
            </div>
            <input
              type="file"
              {...register("videoFile")}
              onChange={handleVideoChange}
              ref={videoInputRef}
              className="VU-files"
            />
            <input
              type="file"
              {...register("thumbnail")}
              onChange={handleThumbnailChange}
              ref={thumbnailInputRef}
              className="VU-files"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default VideoUploadModal;
