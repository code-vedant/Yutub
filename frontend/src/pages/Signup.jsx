import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../style/signup.css";
import { login as AuthLogin } from "../store/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import redBg from "../assets/redBg.jpg"
import upload from "../assets/upload.png";
function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [profilePic, setProfilePic] = useState("");

  const handleInputChange = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
    setProfilePic(event.target.files[0])
  };

  const Signup = async (data) => {
    setError("");
    try {
      const session = await axios.post();
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
        <div className="Signup-box">
          <div className="Signup-box-left">
          <Link to="/" className="Signup-logo-link">
            <div className="SU-logo">
              <img src={logo} alt="" />
            </div>
          </Link>
            <h1>Create your account</h1>
            <h3>please enter your details</h3>
            {error && <p className="ErrorMessage">{error}</p>}
            <form onSubmit={handleSubmit(Signup)} className="SignupForm">
              <div className="su-imgHolder"  onClick={handleInputChange}  >
                {profilePic ? (<img src={URL.createObjectURL(profilePic)} className="uploadedImg"  alt="" />) : (<img src={upload}  alt="" />) }
              
              </div>
              <input type="file" ref={inputRef} onChange={handleImageChange} name="profile picture" className="profileInput"/>
              <label htmlFor="" className="SignupLabel">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="SignupInput"
                {...register("fullName", { required: true })}
              />
              <label htmlFor="" className="SignupLabel">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="SignupInput"
                {...register("username", { required: true })}
              />
              <label htmlFor="" className="SignupLabel">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="SignupInput"
                {...register("email", { required: true })}
              />
              <label htmlFor="" className="SignupLabel">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="SignupInput"
                {...register("password", { required: true })}
              />
              <span>
                <input type="checkbox"/>
                <h4>I agree to all <Link to="/termsandcondition">&nbsp;Terms & Condition</Link>&nbsp; and &nbsp;<Link to="/privacypolicy">Privacy Policy</Link></h4>
              </span>
              <button type="submit">Signup</button>
            </form>
            <h5>Already have an Account? <Link to="/Login">Log in</Link> </h5>
          </div>
          <div className="Signup-box-center">
            <img src={redBg} alt="" />
          </div>
          <div className="Signup-box-right">
            <h3>Heyy..</h3>
            <h6>Welcome To VideoTube</h6>
            <div className="videoHolder">
            </div>
          </div>
        </div>
    </>
  );
}

export default Signup;
