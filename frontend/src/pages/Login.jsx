import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../style/login.css";
import { login as AuthLogin } from "../store/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../Service/auth.js";
import logo from "../assets/logo.png";
import redBg from "../assets/redBg.jpg"
import PopupHolder from "../components/PopupHolder.jsx";
import Loader from "../components/Loader.jsx";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const res = await AuthService.login(data);
      if (res) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(
          AuthLogin({
            user: res.data.user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        
        navigate("/");
      }else{
        setError(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError( "An error occurred during login.");
      setLoading(false);
    }
  };

  return (
    <>
    {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <div className="login-main">
        <div className="Login-box">
        <div className="Login-box-left">
        <Link to="/" className="Login-logo-link">
            <div className="LP-logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          <h1>Welcome Back!!</h1>
            <h3>please enter your details</h3>
            {error && <p className="ErrorMessage">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="LoginForm">
              <label htmlFor="" className="LoginLabel">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="LoginInput"
                {...register("email", { required: true })}
              />
              <label htmlFor="" className="LoginLabel">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="LoginInput"
                {...register("password", { required: true })}
              />
              <button type="submit">Login</button>
            </form>
            <h5>New here, Make a account for free <Link to="/signup">Click Here</Link> </h5>
          </div>
          <div className="Login-box-center">
            <img src={redBg} alt="" />
          </div>
          <div className="Login-box-right">
          <h3>Hey ya..</h3>
          <h6>Welcome Back!!</h6>
          <p>
            Your go-to platform for endless video content! Join us to enjoy
            exclusive content and connect with millions of creators worldwide.
          </p>

          <div className="Login-footer">
            <p>©</p>
            <div className="Login-logo">
              <img src={logo} alt="Logo"/>
            </div>
            <p> All rights reserved.</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
