import { FaPlus } from "react-icons/fa";
import "../style/playlist/playlists.css";
import { useEffect, useState } from "react";
import PopupHolder from "../components/PopupHolder";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/globalError";
import { Link } from "react-router-dom";
import AddNewCollectionModal from "../components/modals/AddNewCollectionModal";
import CollectionService from "../service/collection";

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


export default function Collections() {
  const [showModal, setShowModal] = useState(false);
  const [collections,setCollections] = useState([])
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getCollections = async () => {
    try {
      const response = await CollectionService.getUserCollections(user._id);
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error.response?.data);
      dispatch(setError(error.response?.data?.message || "Failed to fetch collections"));
    }
  }

  useEffect(()=>{
    getCollections();
  },[])

  return (
    <section className="playlists-main">
      <h2>Your Collections</h2>
      <div className="playlist-containers">
        <button className="addNewPlaylist" onClick={toggleModal}>
          <FaPlus className="icon" />
          <span>New Collection</span>
        </button>
        {collections.map((play) => 
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
          <AddNewCollectionModal closeFn={toggleModal} accessToken={accessToken} dispatch={dispatch} />
        </PopupHolder>
      )}
    </section>
  );
}
