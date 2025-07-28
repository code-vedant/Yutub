import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PhotoService from "../../../service/photo";
import upload from "../../../assets/upload.png";
import "../../../style/studio/addPostModal.css";
import { setError } from "../../../store/globalError";

export default function AddPostModal() {
  const { register, handleSubmit } = useForm();
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const photoInputRef = useRef(null);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handlePhotoInputChange = () => photoInputRef.current.click();

  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPhotos(selectedFiles);

    const previewURLs = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewURLs);
  };

  useEffect(() => {
    // Cleanup object URLs on unmount or photos change
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const uploadPhoto = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    photos.forEach((photo) => {
      formData.append("photoFile", photo); 
    });

    try {
      await PhotoService.uploadPhoto(accessToken, formData);
    } catch (error) {
      console.error("Error uploading photo");
      dispatch(
        setError(error?.response?.data?.message || "Failed to upload photo")
      );
    }
  };

  return (
    <section className="APostM-main">
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit(uploadPhoto)}>
        <div className="APostM-top">
          <div className="imgContainer">
            <div className="APostM-photo">
              {previews.length > 0 ? (
                <div className="afterUpload" onClick={handlePhotoInputChange}>
                  {previews.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "8px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="beforeUpload">
                  <img
                    src={upload}
                    onClick={handlePhotoInputChange}
                    alt="upload thumbnail"
                  />
                  <h3>Click here to add images</h3>
                </div>
              )}
              <input
                type="file"
                {...register("photoFile")}
                onChange={handlePhotoChange}
                ref={photoInputRef}
                className="APostM-files"
                accept="image/*"
                multiple
              />
            </div>
          </div>
          <div className="APostM-Metadata">
            <textarea
              placeholder="Write your post content here..."
              {...register("content")}
            />
          </div>
        </div>
        <div className="APostM-bottom">
          <button className="cancel">Cancel</button>
          <button type="submit">Post</button>
        </div>
      </form>
    </section>
  );
}
