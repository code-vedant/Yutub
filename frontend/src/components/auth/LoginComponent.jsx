import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { login as AuthLogin, setAccessToken } from "../../store/userAuth.js";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthService from "../../service/auth.js";
import logo from "../../assets/logo.png";
import Input from './Input.jsx';
import Label from './Label.jsx';
import Button from './Button.jsx';
import { useUserData } from '../../hooks/useUserData.jsx';

export default function LoginComponent() {
  const { isLoading, setIsLoading } = useOutletContext();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  
  const { fetchUserData } = useUserData();

  const login = async (data) => {
  setError("");
  setIsLoading(true);

  try {
    const res = await AuthService.login(data);

    if (res?.statusCode === 200) {
      const { user, accessToken } = res.data;

      dispatch(AuthLogin({ user, accessToken }));
      dispatch(setAccessToken({ accessToken }));

      // Fetch user-specific data if needed
      await fetchUserData(accessToken, user._id);
      
      console.log("Login successful and user data loaded");
      navigate("/");
    } else {
      setError(res.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    setError(error.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="Login-box">
      <Link to="/" className="logo-link">
        <div className="Auth-logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <h1>Welcome Back!!</h1>
      <h3>Please enter your details</h3>
      {error && <p className="ErrorMessage">{error}</p>}
      
      <form onSubmit={handleSubmit(login)} className="LoginForm">
        <Label className="Form-Label">Email</Label>
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
              message: "Please enter a valid email address",
            }
          }}
          error={errors.email?.message}
        />

        <Label className="Form-Label">Password</Label>
        <Input
          type="password"
          placeholder="Enter your password"
          className="Form-Input"
          register={register}
          name="password"
          validation={{ 
            required: "Password is required",
            minLength: {
              value: 1,
              message: "Password is required"
            }
          }}
          error={errors.password?.message}
        />

        <Button 
          className='Form-Button' 
          type="submit"
          isLoading={isLoading}
          loadingText="Logging in..."
        >
          Login
        </Button>
      </form>
      
      <h5>
        New here, Make your account for free{" "}
        <Link to="/auth/signup">Click Here</Link>
      </h5>
    </div>
  )
}