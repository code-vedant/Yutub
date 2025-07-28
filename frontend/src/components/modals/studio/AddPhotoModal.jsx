import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PhotoService from "../../../service/photo";
import upload from "../../../assets/upload.png";
import "../../../style/studio/addPhotoModal.css";
import {setError} from "../../../store/globalError"

export default function AddPhotoModal() {
  const { register, handleSubmit } = useForm();
  const [photo, setPhoto] = useState(null);
  const photoInputRef = useRef(null);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch()

  const handlePhotoInputChange = () => photoInputRef.current.click();

  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const uploadPhoto = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("photoFile", photo);

    try {
      await PhotoService.uploadPhoto(accessToken, formData);
    } catch (error) {
      console.error("Error uploading photo");
        dispatch(setError(error.response.data.message || "Failed to upload photo"));
    }
  };

  return (
    <section className="APM-main">
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit(uploadPhoto)}>
        <div className="APM-top">
          <div className="imgContainer">
            <div className="APM-photo">
              {photo ? (
                <div
                  className="afterUpload"
                  onClick={handlePhotoInputChange}
                >
                  <img src={URL.createObjectURL(photo)} alt="" />
                </div>
              ) : (
                <div className="beforeUpload">
                  <img
                    src={upload}
                    onClick={handlePhotoInputChange}
                    alt="upload thumbnail"
                  />
                  <h3>Add Photo</h3>
                </div>
              )}
              <input
                type="file"
                {...register("photoFile")}
                onChange={handlePhotoChange}
                ref={photoInputRef}
                className="APM-files"
              />
            </div>
          </div>
          <div className="APM-Metadata">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Photo title goes here"
              {...register("title")}
            />

            <label>Description:</label>
            <textarea
              placeholder="Photo Description goes here"
              {...register("description")}
            />
          </div>
        </div>
        <div className="APM-bottom">
            <button className="cancel" >Cancel</button>
            <button type="submit">Upload</button>
        </div>
      </form>
    </section>
  );
}
