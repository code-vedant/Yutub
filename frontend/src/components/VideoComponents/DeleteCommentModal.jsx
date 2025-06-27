import { BsTrash3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";


export default function DeleteCommentModal({closeDeleteModal,deleteComment}) {
  return (
    <div className="deleteCommentBox">
        <button onClick={closeDeleteModal} className="deleteCommentBox-close">
        <IoClose className="icon"/>
    </button>
    <div className="deleteCommentBox-head">
        <BsTrash3 className="icon"/>
    </div>
    <p>Are you sure you want to delete this comment.</p>
    <div className="Dbtnss">
      <button className="cancel" onClick={closeDeleteModal}>No, Cancel</button>
      <button onClick={deleteComment}>Yes, Delete</button>
    </div>
  </div>
  )
}
