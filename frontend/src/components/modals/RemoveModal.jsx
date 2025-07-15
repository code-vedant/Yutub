import { IoClose ,IoCloseCircleOutline} from "react-icons/io5";
import "../../style/modal.css"



export default function RemoveModal({closeFn,deleteFn,item}) {
  return (
    <div className="deleteBox">
        <button onClick={closeFn} className="modal-close">
        <IoClose className="icon"/>
    </button>
    <div className="deleteBox-head">
        <IoCloseCircleOutline className="icon"/>
    </div>
    <p>Are you sure you want to remove this {item}.</p>
    <div className="btn">
      <button className="cancel" onClick={closeFn}>No, Cancel</button>
      <button onClick={deleteFn}>Yes, Remove</button>
    </div>
  </div>
  )
}
