import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../style/signup.css";
import { login as AuthLogin } from "../store/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import redBg from "../assets/redBg.jpg";
import upload from "../assets/upload.png";
import AuthService from "../Service/auth.js";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const Signup = async (data) => {
    setError("");
    if (!agreeToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setIsLoading(true);

    const requestBody = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      username: data.username,
      avatar: profilePic,
    };

    try {
      const session = await AuthService.signup(requestBody);
      if (session) {
        localStorage.setItem("accessToken", session.data.accessToken);
        localStorage.setItem("refreshToken", session.data.refreshToken);
        dispatch(
          AuthLogin({
            userData: session.data,
            accessToken: session.data.accessToken,
            refreshToken: session.data.refreshToken,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      setError("failed to signup: Try again ");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="Signup-box">
        <div className="Signup-box-left">
          <Link to="/" className="Signup-logo-link">
            <div className="SU-logo">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <h1>Create your account</h1>
          <h3>Please enter your details</h3>
          {error && <p className="ErrorMessage">{error}</p>}
          <form onSubmit={handleSubmit(Signup)} className="SignupForm">
            <div className="su-imgHolder" onClick={handleInputChange}>
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  className="uploadedImg"
                  alt="Uploaded profile"
                />
              ) : (
                <img src={upload} alt="Upload" />
              )}
            </div>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              name="profile picture"
              className="profileInput"
              style={{ display: "none" }}
            />
            <label className="SignupLabel">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="SignupInput"
              {...register("fullName", { required: "Name is required" })}
            />
            {errors.fullName && (
              <p className="ErrorMessage">{errors.fullName.message}</p>
            )}

            <label className="SignupLabel">Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="SignupInput"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="ErrorMessage">{errors.username.message}</p>
            )}

            <label className="SignupLabel">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="SignupInput"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="ErrorMessage">{errors.email.message}</p>
            )}

            <label className="SignupLabel">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="SignupInput"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="ErrorMessage">{errors.password.message}</p>
            )}

            <span>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <h4>
                I agree to all
                <Link to="/termsandcondition">&nbsp;Terms & Conditions</Link>
                &nbsp;and&nbsp;
                <Link to="/privacypolicy">Privacy Policy</Link>
              </h4>
            </span>
            <button type="submit" disabled={!agreeToTerms || isLoading}>
              {isLoading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <h5>
            Already have an Account? <Link to="/Login">Log in</Link>
          </h5>
        </div>
        <div className="Signup-box-center">
          <img src={redBg} alt="Background" />
        </div>
        <div className="Signup-box-right">
          <h3>Hey ya..</h3>
          <h6>Welcome To YUTUB</h6>
          <p>
            Your go-to platform for endless video content! Join us to enjoy
            exclusive content and connect with millions of creators worldwide.
          </p>

          <div className="signup-footer">
            <p>©</p>
            <div className="SF-logo">
              <img src={logo} alt="Logo" />
            </div>
            <p> All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
