import { PiPlus } from "react-icons/pi";
import "../style/playlist/playlists.css";
import { useState } from "react";
import PopupHolder from "../components/PopupHolder"
import AddNewPlaylistModal from "../components/modals/AddNewPlaylistModal";

export default function Playlists() {
  const [showModal,setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <section className="playlists-main">
      <h2>Your saved playlist</h2>
      <div className="playlist-containers">
        <button className="addNewPlaylist" onClick={toggleModal}>
          <PiPlus className="icon"/>
          <span>Add new Playlist</span>
        </button>
        <div className="playlist">asdada</div>
        <div className="playlist">asdada</div>
        <div className="playlist">asdada</div>
        <div className="playlist">asdada</div>
        <div className="playlist">asdada</div>
        <div className="playlist">asdada</div>
      </div>

      {
        showModal && (
          <PopupHolder>
             <AddNewPlaylistModal closeFn={toggleModal}/>
          </PopupHolder>
        )
      }
    </section>
  );
}
