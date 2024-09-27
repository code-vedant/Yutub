import React, { useState } from 'react'
import PopupHolder from "../PopupHolder.jsx"
import Loader from "../Loader"
import PlaylistService from '../../Service/playlist.js'
import { useNavigate } from 'react-router-dom'

function DeletePlaylist({closeDeleteModal,accessToken,playlistId}) {
    const [loading,setLoading] =useState(false)
    const navigate = useNavigate()

    const DeletePlaylist = async () => {
        setLoading(true)
        try {
            await PlaylistService.deletePLaylist(accessToken,playlistId)
            setLoading(false)
            closeDeleteModal()
            navigate("/profile")
        } catch (error) {
            console.error(error.message);
            setLoading(false)
        }
    }
  return (
    <div className='dt-main'>
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
        <h1>Delete Playlist</h1>
        <p>Are you sure you want to delete this Playlist?</p>
        <div className="dt-btn">
          <button onClick={closeDeleteModal}>Cancel</button>
          <button onClick={DeletePlaylist}>Delete</button>
        </div>
    </div>
  )
}

export default DeletePlaylist