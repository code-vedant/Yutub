import { BsTrash3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "../../style/modal.css"

export default function DeleteModal({closeFn,deleteFn,item}) {
  return (
    <div className="deleteBox">
        <button onClick={closeFn} className="modal-close">
        <IoClose className="icon"/>
    </button>
    <div className="deleteBox-head">
        <BsTrash3 className="icon"/>
    </div>
    <p>Are you sure you want to delete this {item}.</p>
    <div className="btn">
      <button className="cancel" onClick={closeFn}>No, Cancel</button>
      <button onClick={deleteFn}>Yes, Delete</button>
    </div>
  </div>
  )
}
