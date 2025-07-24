import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import "../../style/playlist/addNewPlaylist.css";
import {setError} from "../../store/globalError"
import CollectionService from "../../service/collection";

export default function AddNewCollectionModal({ closeFn,accessToken,dispatch }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await CollectionService.createCollection(data,accessToken)
      
    } catch (error) {
      dispatch(setError(error.response?.data.message));
    }
    closeFn(); 
  };

  return (
    <div className="addNewPlaylist-main">
      <h2>Add Collection</h2>
      <button onClick={closeFn} className="modal-close">
        <IoClose className="icon" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Add collection name"
        />
        <label>Description:</label>
        <textarea
          {...register("description")}
          placeholder="Add description for collection"
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
