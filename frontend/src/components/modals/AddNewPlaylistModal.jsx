import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import "../../style/playlist/addNewPlaylist.css";
import PlaylistService from "../../service/playlist";
import {setError} from "../../store/globalError"

export default function AddNewPlaylistModal({ closeFn,accessToken,dispatch }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await PlaylistService.createPlaylist(data,accessToken)
    } catch (error) {
      dispatch(setError(error.response?.data.message));
    }
    closeFn(); 
  };

  return (
    <div className="addNewPlaylist-main">
      <h2>Add New Playlist</h2>
      <button onClick={closeFn} className="modal-close">
        <IoClose className="icon" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Add playlist name"
        />
        <label>Description:</label>
        <textarea
          {...register("description")}
          placeholder="Add description for playlist"
        ></textarea>
        <div className="form-btn">
          <button type="submit">Create</button>
          <button type="button" onClick={closeFn} className="cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
