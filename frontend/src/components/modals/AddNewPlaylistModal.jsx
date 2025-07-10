import { IoClose } from "react-icons/io5"
import "../../style/playlist/addNewPlaylist.css"
export default function AddNewPlaylistModal({closeFn}) {
  return (
    <div className="addNewPlaylist-main">
      <h2>Add New Playlist</h2>
      <button onClick={closeFn} className="modal-close">
              <IoClose className="icon"/>
          </button>

          <form>
            <label>Name:</label>
            <input type="text" name="name" id="" placeholder="Add playlist name" />
            <label htmlFor="Desciption">Description</label>
            <textarea name="Description" id="" placeholder="Add description for playlist"></textarea>
            <div className="form-btn">
              <button type="submit">Create</button>
              <button onClick={closeFn} className="cancel">Cancel</button>
            </div>
          </form>
    </div>
  )
}
