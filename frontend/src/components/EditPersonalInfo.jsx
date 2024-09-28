import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../style/editDetails.css";
import upload from "../assets/upload.png";
import AuthService from "../Service/auth.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function EditPersonalInfo({ closeModal }) {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const profilePictureRef = useRef(null);
  const posterPictureRef = useRef(null);
  const [avatarPic, setAvatarPic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleAvatarChange = (event) => {
    setAvatarPic(event.target.files[0]);
  };
  const handleCoverChange = (event) => {
    setCoverPic(event.target.files[0]);
  };

  const handleAvatarPictureChange = () => {
    profilePictureRef.current.click();
  };

  const handleCoverPictureChange = () => {
    posterPictureRef.current.click();
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const editDetails = async (data) => {
    setError("");


    const formData = new FormData();
    if (avatarPic) formData.append("avatar", avatarPic);

    const coverformData = new FormData();
    if (coverPic) coverformData.append("coverImage", coverPic);

    const requestBody = {
      fullName: data.fullName,
      email: data.email,
    };


    try {

      if (avatarPic || coverPic || requestBody.fullName.length > 0) {
        if (requestBody.fullName.length > 0 || avatarPic || coverPic) {
          if (requestBody.fullName.length > 0) {
            await AuthService.updateProfile(accessToken, requestBody);
          }
          if (avatarPic) {
            await AuthService.updateAvatar(accessToken, formData);
          }
          if (coverPic) {
            await AuthService.updateCoverImage(accessToken, coverformData);
          }
        }
        closeModal();
        window.location.reload();
      }

      reset();
      closeModal();
    } catch (error) {
      setError("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="EditPersonalInfo-Main">
      <form onSubmit={handleSubmit(editDetails)}>
        <div className="ED-imageHolder">
          <div className="coverHolder">
            {coverPic ? (
              <img
                src={URL.createObjectURL(coverPic)}
                onClick={handleCoverPictureChange}
                className="imgAchieved"
              />
            ) : (
              <img
                src={upload}
                onClick={handleCoverPictureChange}
                alt="upload Cover"
              />
            )}
          </div>
          <div className="avatarHolder">
            {avatarPic ? (
              <img
                src={URL.createObjectURL(avatarPic)}
                onClick={handleAvatarPictureChange}
                className="imgAchieved"
              />
            ) : (
              <img
                src={upload}
                onClick={handleAvatarPictureChange}
                alt="upload Profile Image"
              />
            )}
          </div>
        </div>
        <input
          type="file"
          {...register("avatar")}
          ref={profilePictureRef}
          onChange={handleAvatarChange}
          className="ED-files"
          accept="image/*"
        />
        <input
          type="file"
          {...register("cover")}
          ref={posterPictureRef}
          onChange={handleCoverChange}
          className="ED-files"
          accept="image/*"
        />
        <label>Full Name:</label>
        <input type="text" {...register("fullName")} />
        <label>Email:</label>
        <input type="email" {...register("email")} />
        <div className="ED-Btn">
          <button type="submit">Save Changes</button>
          <button type="cancel" onClick={closeModal} className="CancelBtn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPersonalInfo;
