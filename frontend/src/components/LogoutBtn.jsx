import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Service/auth.js';
import { logout as logoutAction } from '../store/userAuth.js';
// import "../style/header.css"

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken); // Get accessToken from Redux store

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        throw new Error("Access token is not available.");
      }
      await AuthService.logout(accessToken); // Pass accessToken to AuthService
      // Clear tokens from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logoutAction());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <button onClick={handleLogout} className='logoutBtn'>Logout</button>;
};

export default Logout;
