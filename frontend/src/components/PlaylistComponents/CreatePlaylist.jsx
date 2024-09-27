import React, { useState } from "react";
import "../../style/playlist.style.css";
import PopupHolder from "../PopupHolder.jsx"
import Loader from "../Loader"
import {useForm} from "react-hook-form"
import PlaylistService from "../../Service/playlist.js";

function CreatePlaylist({closeCreatePlaylistModal, accessToken}) {
    const [loading,setLoading] =useState(false)

    const {register, handleSubmit} = useForm()

    const createPlaylist =async (data) => {
        setLoading(true)
      try {
        await PlaylistService.createPlaylist(accessToken,data)
        setLoading(false)
        closeCreatePlaylistModal()
      } catch (error) {
        console.error(error.message)
        setLoading(false)
      }
    };
  return (
    <div className="cp-main">
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <form onSubmit={handleSubmit(createPlaylist)}>
        <h2>Create a new playlist</h2>
        <input type="text" placeholder="Add playlist name..." {...register("name")} />
        <textarea placeholder="Add playlist description..." {...register("description")} />
        <div className="cp-btn">
          <button onClick={closeCreatePlaylistModal}>Cancel</button>  
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlaylist;
