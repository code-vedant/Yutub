import React, { useRef } from "react";
import "../style/videoUploadPage.css";
import { useForm } from "react-hook-form";
import upload from "../assets/upload.png";

function VideoUploadModal({closeModal}) {
  const { register, handleSubmit } = useForm();
  const inputRef = useRef(null);

  const handleInputChange = () => {
    inputRef.current.click();
  };

  const editDetails = (data) => {
    console.log(data);
  };
  return (
    <section className="VideoUploadmain">
      <div className="VU-head">
        <h1>Upload Video</h1>
      </div>
      <div className="VU-Body">
      <div className="VU-Form">
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" {...register("title")} />
            <label>Description:</label>
            <textarea {...register("description")} />
        </form>
      </div>
      <div className="VU-Graphics">
        <form onSubmit={handleSubmit(editDetails)}>
          <div className="VU-imageHolder">
            <div className="VU-VideoContainer">
            <img src={upload} onClick={handleInputChange} alt="upload Poster" />
            <h3>Upload Video</h3>
            </div>
            <div className="VU-ThumbnailContainer">
            <img
              src={upload}
              onClick={handleInputChange}
              alt="upload Profile Image"
            />
            <h3>Add Thumbnail</h3>
            </div>
          </div>
          <div className="VU-btns">
            <button type="cancel" className="CancelBtn" onClick={closeModal}>Cancel</button>
            <button type="submit" >Upload</button>
          </div>
          <input
            type="file"
            {...register("profilePicture")}
            ref={inputRef}
            className="VU-files"
          />
          <input
            type="file"
            {...register("posterPicture")}
            ref={inputRef}
            className="VU-files"
          />
        </form>
      </div>
      </div>
      
    </section>
  );
}

export default VideoUploadModal;
