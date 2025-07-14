import { FaPlus } from "react-icons/fa";
import "../style/playlist/playlists.css";
import { useEffect, useState } from "react";
import PopupHolder from "../components/PopupHolder";
import AddNewPlaylistModal from "../components/modals/AddNewPlaylistModal";
import { useDispatch, useSelector } from "react-redux";
import PlaylistService from "../service/playlist";
import { setError } from "../store/globalError";
import { Link } from "react-router-dom";

const bg = [
  "#DCE1E3",
  "#C8D6E5",
  "#A7BBC7",
  "#B8C6DB",
  "#B0BEC5",
  "#A5D6A7",
  "#90CAF9",
  "#FFE082",
  "#FFAB91",
  "#B39DDB",
  "#80CBC4",
  "#FFCCBC",
  "#F48FB1",
  "#AED581",
  "#9FA8DA",
  "#80DEEA",
  "#D7CCC8",
  "#CFD8DC",
  "#B0BEC5",
  "#A1887F"
]


export default function Playlists() {
  const [showModal, setShowModal] = useState(false);
  const [playlists,setPlaylists] = useState([])
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getPlaylists = async () => {
    try {
      const response = await PlaylistService.getUserPlaylists(accessToken,user._id);
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error.message);
      dispatch(setError(error.response?.data?.message || "Failed to fetch playlists"));
    }
  }

  useEffect(()=>{
    getPlaylists();
  },[])

  return (
    <section className="playlists-main">
      <h2>Your saved playlist</h2>
      <div className="playlist-containers">
        <button className="addNewPlaylist" onClick={toggleModal}>
          <FaPlus className="icon" />
          <span>Add new Playlist</span>
        </button>
        {playlists.map((play) => 
        (<Link to={`${play._id}`}
        key={play._id}
          className="playlist"
          style={{ backgroundColor: bg[Math.floor(Math.random() * bg.length)] }}
        >
          {play.name}
        </Link>)
      )}
    
        </div>

      {showModal && (
        <PopupHolder>
          <AddNewPlaylistModal closeFn={toggleModal} accessToken={accessToken} dispatch={dispatch} />
        </PopupHolder>
      )}
    </section>
  );
}
