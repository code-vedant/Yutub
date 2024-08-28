import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../style/login.css";
import { login as AuthLogin } from "../store/userAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../Service/auth.js";
import logo from "../assets/logo.png";
import redBg from "../assets/redBg.jpg"


function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const login = async (data) => {
    setError("");
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
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
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
          <div className="Signup-box-center">
            <img src={redBg} alt="" />
          </div>
          <div className="Signup-box-right">
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
