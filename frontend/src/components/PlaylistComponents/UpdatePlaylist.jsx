import React, { useState } from "react";
import "../../style/playlist.style.css";
import PopupHolder from "../PopupHolder.jsx"
import Loader from "../Loader"
import {useForm} from "react-hook-form"
import PlaylistService from "../../Service/playlist.js";

function EditPlaylistModal({ closeEditModal ,accessToken,playlistId}) {
    const [loading,setLoading] =useState(false)

    const {register, handleSubmit} = useForm()

    const handleEdit =async (data) => {
        setLoading(true)
      try {
        await PlaylistService.updatePlaylist(accessToken,playlistId,data)
        setLoading(false)
        closeEditModal()
      } catch (error) {
        console.error(error.message)
        setLoading(false)
      }
    };
  return (
    <div className="epm-main">
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <form onSubmit={handleSubmit(handleEdit)}>
        <h2>Edit Playlist</h2>
        <input type="text" placeholder="New playlist name..." {...register("name")} />
        <textarea placeholder="New playlist description..." {...register("description")} />
        <div className="epm-btn">
          <button onClick={closeEditModal}>Cancel</button>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditPlaylistModal;
