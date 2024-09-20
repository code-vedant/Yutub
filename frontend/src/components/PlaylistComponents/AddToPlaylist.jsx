import React, { useEffect, useState } from 'react'
import "../../style/playlist.style.css";
import { useSelector } from 'react-redux';
import PlaylistService from '../../Service/playlist';


function AddToPlaylist({closePlaylistOptions,accessToken,videoId}) {

    const [playlist, setPlaylist] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {_id: userId} = useSelector((state) => state.auth.userData)

    console.log(userId);
    


    useEffect(() => {
        const fetchPlaylists = async () => {
          setError(""); 
          setLoading(true);
    
          try {
            const response = await PlaylistService.getUserPlaylists(accessToken, userId);
            setPlaylist(response.data); 
          } catch (error) {
            console.error(error);
            setError(error.message || "Failed to fetch playlists"); 
          } finally {
            setLoading(false);
          }
        };
    
        if (userId) {
          fetchPlaylists();
        }
      }, [userId, accessToken]);

    const addToPlaylist = async (playlistId) => {
        try {
            await PlaylistService.addVideo(accessToken,videoId,playlistId);
            console.log("aaaaaaaaaaa");
            
            closePlaylistOptions();
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to add video to playlist");
        }
    }

  

  return (
    <div className='AtP-main'>
      <h2>Add to....</h2>
        {playlist.map((playlist)=>
             (
                <div key={playlist._id} className='AtP-list' onClick={()=>{addToPlaylist(playlist._id)}}>
                    {playlist.name}
                </div>
            )
        )}
    </div>
  )
}

export default AddToPlaylist