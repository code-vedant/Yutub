import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../service/auth.js';
import { logout as logoutAction } from '../store/userAuth.js';
import { persistor } from '../store/store.js';
import "../style/components.css"

const Logout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogout = async () => {
    
    try {
      if (!accessToken) {
        throw new Error("Access token is not available.");
      }
      
      // Call API logout
      await AuthService.logout(accessToken.accessToken);
      
      // Clear persisted Redux data
      await persistor.purge();
      
      // Clear in-memory Redux state (this will also clear likes due to extraReducers)
      dispatch(logoutAction());
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if API call fails, clear local data
      try {
        await persistor.purge();
        dispatch(logoutAction()); // This will also clear likes
      } catch (persistError) {
        console.error('Failed to clear local data:', persistError);
      }
    }
  };

  return <button onClick={handleLogout} className='logoutBtn'>Logout</button>;
};

export default Logout;