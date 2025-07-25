import { useEffect, useState } from "react";
import "../style/playlist.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../service/auth";
import PopupHolder from "../components/PopupHolder";
import NoVideo from "../components/Profile/NoVideo";
import { BsThreeDotsVertical } from "react-icons/bs";
import PlaylistDetails from "../components/modals/PlaylistDetails";
import DeleteModal from "../components/modals/DeleteModal";
import CollectionService from "../service/collection";
import { setError } from "../store/globalError";
import EditCollection from "../components/collections/EditCollection";
import PhotoContainerForCollection from "../components/Photos/PhotoContainerForCollection";

function CollectionPage() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => setShowOptions((prev) => !prev);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id: collectionId } = useParams();

  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [photos, setPhotos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detailModel, setDetailModal] = useState(false);

  const handleEditModal = () => setEditModal(true);
  const closeEditModal = () => setEditModal(false);

  const handleDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleDetailModal = () => setDetailModal(true);
  const closeDetailModal = () => setDetailModal(false);

  useEffect(() => {
    const getCollectionData = async () => {
      setLoading(true);
      try {
        const response = await CollectionService.getCollectionById(collectionId);
        const collectionData = response.data;
        
        setCollection(collectionData);
        setPhotos(collectionData.photos);
        const ownerResponse = await AuthService.getUserById(collectionData.owner);
        setOwner(ownerResponse.data);
      } catch (error) {
        dispatch(setError(error.response?.data?.message || "Failed to fetch collection data"));
      } finally {
        setLoading(false);
      }
    };
    getCollectionData();
  }, [collectionId,dispatch]);

  const DeleteCollection = async () => {
    setLoading(true);
    try {
      await CollectionService.deleteCollection(accessToken, collectionId);
      setLoading(false);
      closeDeleteModal();
      navigate(-1);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const removePhoto = async (photoId) => {
    try {
      const res = await CollectionService.removePhoto(
        accessToken,
        photoId,
        collectionId
      );
      if (res.status == 200)
        setPhotos((prevVideos) => prevVideos.filter((v) => v._id !== photoId));
    } catch (error) {
      console.error("Error removing video:", error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".PP-options")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}

      <div className="PlaylistPage-main">
        <div className="PP-left">
          <div className="PP-title">
            <h3>{collection.name || "Collection Title"}</h3>
            <h5>{owner.fullName}</h5>
          </div>
          <div className="PP-options">
            <BsThreeDotsVertical className="icon" onClick={toggleOptions} />
            {showOptions && (
              <ul className="PP-edits">
                <li className="PP-btn" onClick={handleDetailModal}>
                  Details
                </li>
                <li className="PP-btn" onClick={handleEditModal}>
                  Edit
                </li>
                <li className="PP-btn" onClick={handleDeleteModal}>
                  Delete
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="PP-right">
          {photos?.length > 0 ? (
            photos?.map((vidId, index) => (
              <PhotoContainerForCollection
                key={index}
                photoId={vidId}
                collectionOwnerId={owner?._id}
                currentUserId={user?._id}
                removeFn={removePhoto}
              />
            ))
          ) : (
            <NoVideo />
          )}
        </div>
        {detailModel && (
          <PopupHolder>
            <PlaylistDetails
              playlist={collection}
              owner={owner}
              closeDetailModal={closeDetailModal}
              type="collection"
            />
          </PopupHolder>
        )}
        {editModal && (
          <PopupHolder>
            <EditCollection
              closeFn={closeEditModal}
              accessToken={accessToken}
              data={collection}
            />
          </PopupHolder>
        )}
        {deleteModal && (
          <PopupHolder>
            <DeleteModal
              closeFn={closeDeleteModal}
              deleteFn={DeleteCollection}
              item={"Collection"}
            />
          </PopupHolder>
        )}
      </div>
    </>
  );
}

export default CollectionPage;
