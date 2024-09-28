import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import robot from "../assets/robot.png";
import { useForm } from "react-hook-form";
import CommentComponent from "./CommentComponent";
import CommentService from "../Service/comment";
import { useSelector } from "react-redux";

const Comments = ({ accessToken,videoId, comments }) => {
  const { register, handleSubmit } = useForm();
  const [comment, setComment] = useState([]);
  const [handleBtns, setHandleBtns] = useState(false);
  const [error, setError] = useState("")

  const ownerData = useSelector((state) => state.auth.userData);


  const handleBtn = () => {
    setHandleBtns(true);
  };

  const addComment = async (data) => {
    try {
      const res = await CommentService.addComments(accessToken,videoId,data)
      
      setHandleBtns(false);
    } catch (error) {
      console.error(error || "Error adding comment")
      setError("Error adding comment")
    }
  }

  

  const owner = comments.owner;

  return (
    <div className="comments">
      <h2>{comments.length || "0"}&nbsp;Comments</h2>
      <div className="addCommentSection">
        <div className="acs-left">
          <div className="acs-left-img">
            <Link to={`/profile/${owner}`}>
              {ownerData ? (
                <img src={ownerData.avatar} className="recImg" alt="" />
              ) : (
                <img src={robot} alt="" />
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
        <CommentComponent accessToken={accessToken} comments={comments} />
      </div>
    </div>
  );
};

export default Comments;
