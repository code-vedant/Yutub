import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../service/auth.js';
import { logout as logoutAction } from '../store/userAuth.js';
import "../style/components.css"

const Logout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        throw new Error("Access token is not available.");
      }
      await AuthService.logout(accessToken.accessToken);
      dispatch(logoutAction());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <button onClick={handleLogout} className='logoutBtn'>Logout</button>;
};

export default Logout;