import { useEffect, useState } from "react";
import AuthService from "../service/auth";
import { useSelector } from "react-redux";
import "../style/videos/watchhistory.css";

import VideoHoriz from "../components/VideoComponents/VideoHoriz";

export default function LikedVideosPage() {
  
    const accessToken = useSelector((state => state.auth.accessToken));
    const likedVideos = useSelector((state)=>state.like.likedVideos)
    console.log(likedVideos); //undefined
    
    
return (
    <div className="wh-main">
        <h2>Liked Videos</h2>
        <div className="wh-videos">
            {likedVideos.length > 0 &&
                likedVideos.map((video)=> 
                    <VideoHoriz key={video._id} videoId={video._id} accessToken={accessToken}/>
            )}            
        </div>
    </div>
  )
}