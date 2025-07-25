import {useForm} from "react-hook-form"
import { IoClose } from "react-icons/io5";
import "../../style/playlist/addNewPlaylist.css";
import {setError} from "../../store/globalError"
import { useDispatch } from "react-redux";
import CollectionService from "../../service/collection.js";

function EditCollection({closeFn, accessToken, data}) {

  const dispatch = useDispatch();

    const {register, handleSubmit} = useForm()

    const editCollectionFn = async (d) => {
      try {
        await CollectionService.updateCollection(accessToken,data?._id,d);
        alert("Playlist updated successfully");
        closeFn()
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        dispatch(setError(error.response?.data?.message || error.message))

      }
    };
  return (
    <div className="addNewPlaylist-main">
      <h2>Edit Playlist</h2>
      <button onClick={closeFn} className="modal-close">
        <IoClose className="icon" />
      </button>

      <form onSubmit={handleSubmit(editCollectionFn)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Add collection name"
          defaultValue={data?.name || ""}
        />
        <label>Description:</label>
        <textarea
          {...register("description")}
          placeholder="Add description for collection"
          defaultValue={data?.description || ""}
        ></textarea>
        <div className="form-btn">
          <button type="button" onClick={closeFn} className="cancel">
            Cancel
          </button>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditCollection;
