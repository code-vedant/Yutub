import React, { useRef, useState } from "react";
import "../style/videoUploadPage.css";
import { useForm } from "react-hook-form";
import upload from "../assets/upload.png";
import VideoService from "../service/video";
import { useSelector } from "react-redux";
import PopupHolder from "./PopupHolder";
import UploadingModal from "./UploadingModal";
import UploadedVideo from "./UploadedVideo";

function VideoUploadModal({ closeFn }) {
  const { register, handleSubmit } = useForm();
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [step, setStep] = useState(1);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleVideoInputChange = () => videoInputRef.current.click();
  const handleThumbnailInputChange = () => thumbnailInputRef.current.click();

  const handleVideoChange = (e) => setVideo(e.target.files[0]);
  const handleThumbnailChange = (e) => setThumbnail(e.target.files[0]);

  const uploadVideo = async (data) => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", video);
    formData.append("thumbnail", thumbnail);

    
    try {
      await VideoService.uploadVideo(accessToken, formData);
      setIsUploading(false);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error uploading video");
      setIsUploading(false);
    }
  };

  const closeFn2 = () => {
    setIsUploaded(false);
  }

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <section className="VideoUploadmain">
      {isUploaded && (
        <PopupHolder>
          <UploadedVideo
            closeFn={closeFn2}
          />
        </PopupHolder>
      )}

      {isUploading && (
        <PopupHolder>
          <UploadingModal />
        </PopupHolder>
      )}

      <h2>Upload Video</h2>
      <div className="VU-Body">
        <form onSubmit={handleSubmit(uploadVideo)}>
          <div className="VU-top">
            {step === 1 && (
              <div className="VU-Graphics">
                {/* Video Upload */}
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

                {/* Thumbnail Upload */}
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

                {/* Hidden File Inputs */}
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
            )}

            {step === 2 && (
              <div className="VU-Form">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Video title goes here"
                  {...register("title")}
                />

                <label>Description:</label>
                <textarea
                  placeholder="Video Description goes here"
                  {...register("description")}
                />
              </div>
            )}
          </div>
          <div className="VU-btns">
            {step === 1 && (
              <button type="button" onClick={closeFn} className="CancelBtn">
                Cancel
              </button>
            )}
            {step === 1 && (
              <button type="button" onClick={nextStep}>
                Next
              </button>
            )}
            {step === 2 && (
              <button type="button" className="CancelBtn" onClick={prevStep}>
                Back
              </button>
            )}
            {step === 2 && <button type="submit">Upload</button>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default VideoUploadModal;
