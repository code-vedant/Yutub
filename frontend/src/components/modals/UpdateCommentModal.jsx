import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import "../../style/modal.css";

export default function UpdateCommentModal({ updateFn, closeFn,comment }) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="updateCommentBox">
      <button onClick={closeFn} className="modal-close">
        <IoClose className="icon" />
      </button>
      <h2>Update Comment</h2>
      <form onSubmit={handleSubmit(updateFn)}>
        <textarea
          type="text"
          placeholder="Write a comment..."
          {...register("content")}
          defaultValue={comment?.content || ""}
        />
        <div className="btn">
          <button className="cancel" onClick={closeFn}>Cancel</button>
          <button type="submit">update</button>
        </div>
      </form>
    </div>
  );
}
