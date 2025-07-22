import {  useState } from "react";
import { Link } from "react-router-dom";
import alien from "../../assets/alien.jpeg";
import { useForm } from "react-hook-form";
import CommentComponent from "./CommentComponent";
import CommentService from "../../service/comment";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/globalError";

const Comments = ({ accessToken,videoId, comments }) => {
  const { register, handleSubmit } = useForm();
  const [comment, setComment] = useState(comments || []);
  const [handleBtns, setHandleBtns] = useState(false);

  const ownerData = useSelector((state) => state.auth.userData);
  const likedComments = useSelector((state) => state.like.likedComments);
  const dispatch = useDispatch()
  

  const handleBtn = () => {
    setHandleBtns(true);
  };

  const addComment = async (data) => {
    try {
      await CommentService.addComments(accessToken,videoId,data)
      setHandleBtns(false);
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Error adding comment"))
    }
  }

  const owner = comments.owner;

  return (
    <div className="comments">
      <h2>{comment.length || "0"}&nbsp;Comments</h2>
      <div className="addCommentSection">
        <div className="acs-left">
          <div className="acs-left-img">
            <Link to={`/profile/${owner}`}>
              {ownerData?.avatar ? (
                <img src={ownerData?.avatar} className="recImg" alt="" />
              ) : (
                <img src={alien} alt="" />
              )}
            </Link>
          </div>
        </div>
        <div className="acs-right">
          <form onSubmit={handleSubmit(addComment)}>
            <input
              onFocus={handleBtn}
              type="text"
              placeholder="Add a comment..."
              {...register("content")}
            />
            {handleBtns && (
              <div className="Commentbtns">
                <button
                  onClick={() => {
                    setHandleBtns(false);
                  }}
                  type="cancel"
                >
                  Cancel
                </button>
                <button className="CBsubmitbtn" type="submit">
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="CommentConatiner">
        <CommentComponent accessToken={accessToken} comments={comment} />
      </div>
    </div>
  );
};

export default Comments;
