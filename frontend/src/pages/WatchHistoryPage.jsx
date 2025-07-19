import { useEffect, useState } from "react";
import AuthService from "../service/auth";
import { useSelector } from "react-redux";
import "../style/videos/watchhistory.css";

import VideoHoriz from "../components/VideoComponents/VideoHoriz";

export default function WatchHistoryPage() {
    const [watchHistory, setWatchHistory] = useState([]);
    const accessToken = useSelector((state => state.auth.accessToken));
    const getUserWatchHistory = async() => {
    try {
      const response = await AuthService.getUserData(accessToken);
      console.log(response.data.watchHistory);
      setWatchHistory(response.data.watchHistory)
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
}

useEffect(()=>{
    getUserWatchHistory()
},[])


return (
    <div className="wh-main">
        <h2>Watch History</h2>
        <div className="wh-videos">
            {watchHistory.length > 0 &&
                watchHistory.map((video)=> 
                    <VideoHoriz key={video._id} videoId={video} accessToken={accessToken}/>
            )}            
        </div>
    </div>
  )
}