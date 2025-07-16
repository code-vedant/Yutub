import {useForm} from "react-hook-form"
import PlaylistService from "../../Service/playlist.js";
import { IoClose } from "react-icons/io5";
import "../../style/playlist/addNewPlaylist.css";
import {setError} from "../../store/globalError"
import { useDispatch } from "react-redux";

function EditPlaylist({closeFn, accessToken, data}) {

  const dispatch = useDispatch();

    const {register, handleSubmit} = useForm()

    const createPlaylist = async (d) => {
      try {
        const res = await PlaylistService.updatePlaylist(accessToken,data?._id,d);
        console.log(res);
        
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

      <form onSubmit={handleSubmit(createPlaylist)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Add playlist name"
          defaultValue={data.name || ""}
        />
        <label>Description:</label>
        <textarea
          {...register("description")}
          placeholder="Add description for playlist"
          defaultValue={data.description || ""}
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

export default EditPlaylist;
