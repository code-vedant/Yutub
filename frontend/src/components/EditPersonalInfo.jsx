import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../style/editDetails.css";
import upload from "../assets/upload.png";
import AuthService from "../Service/auth.js";
import { useSelector } from "react-redux";
function EditPersonalInfo({closeModal}) {
  const { register, handleSubmit ,reset } = useForm();
  const [error, setError] = useState("");
  const profilePictureRef = useRef(null);
  const posterPictureRef = useRef(null);
  const [avatarPic, setAvatarPic] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  const handleAvatarChange = () => {
    setAvatarPic(event.target.files[0]);
  };
  const handleCoverChange = () => {
    setCoverPic(event.target.files[0]);
  };

  const handleAvatarPictureChange = () => {
    profilePictureRef.current.click();
  };

  const handleCoverPictureChange = () => {
    posterPictureRef.current.click();
  };

  const editDetails = async (data) => {
    setError("");
    console.log(data);
    try {
      const updates = await AuthService.updateProfile(token,data);
      console.log(updates);
      reset();
    } catch (error) {
      setError("Failed to update profile");
      console.error(error);
    }

    // Reset form inputs
  };

  return (
    <div className="EditPersonalInfo-Main">
      <form onSubmit={handleSubmit(editDetails)}>
        <div className="ED-imageHolder">
          
          <div className="coverHolder">
          {coverPic ? (
            <img src={URL.createObjectURL(coverPic)} onClick={handleCoverPictureChange} className="imgAchieved" />
          ) : (
            <img
              src={upload}
              onClick={handleCoverPictureChange}
              alt="upload Poster"
            />
          )}
          </div>
          <div className="avatarHolder">
          {avatarPic ? (
            <img src={URL.createObjectURL(avatarPic)} onClick={handleAvatarPictureChange} className="imgAchieved"/>
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
          {...register("profilePicture")}
          ref={profilePictureRef}
          onChange={handleAvatarChange}
          className="ED-files"
        />
        <input
          type="file"
          {...register("posterPicture")}
          ref={posterPictureRef}
          onChange={handleCoverChange}
          className="ED-files"
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
