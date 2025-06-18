import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { login as AuthLogin } from "../../store/userAuth.js";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import upload from "../../assets/upload.png";
import AuthService from "../../service/auth.js";
import Input from "./Input.jsx";
import Label from "./Label.jsx";
import Button from "./Button.jsx";

function SignupComponent() {
  const { isLoading, setIsLoading } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [profilePic, setProfilePic] = useState("");
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
      const res = await AuthService.signup(requestBody);
      if (res?.statusCode === 201) {
        dispatch(
          AuthLogin({
            userData: res.data.user,
            accessToken: res.data.accessToken,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="Signup-box">
        <Link to="/" className="logo-link">
          <div className="Auth-logo">
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
          
          <Label className="Form-Label">Name:</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            className="Form-Input"
            register={register}
            name="fullName"
            validation={{ required: "Name is required" }}
            error={errors.fullName?.message}
          />

          <Label className="Form-Label">Username:</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            className="Form-Input"
            register={register}
            name="username"
            validation={{ required: "Username is required" }}
            error={errors.username?.message}
          />

          <Label className="Form-Label">Email:</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="Form-Input"
            register={register}
            name="email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            error={errors.email?.message}
          />

          <Label className="Form-Label">Password:</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            className="Form-Input"
            register={register}
            name="password"
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            error={errors.password?.message}
          />

          <div className="TandC-Div">
            <span>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
            </span>
            <p>
              I agree to all the <Link to="/termsandcondition">Terms and Conditions</Link> and{" "}
              <Link to="/privacypolicy">Privacy Policy</Link>
            </p>
          </div>
          
          <Button
            className="Form-Button"
            type="submit"
            disabled={!agreeToTerms}
            isLoading={isLoading}
            loadingText="Signing up..."
          >
            Signup
          </Button>
        </form>

        <h5>
          Already have an Account? <Link to="/auth/login">Log in</Link>
        </h5>
      </div>
    </>
  );
}

export default SignupComponent;