import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import robot from "../assets/robot.png";
import { useForm } from "react-hook-form";
import CommentComponent from "./CommentComponent";

const Comments = ({ comments }) => {
  const { register, handlesubmit } = useForm();
  const [comment, setComment] = useState([]);
  const [handleBtns, setHandleBtns] = useState(false);
  const [error, setError] = useState("")

  const handleBtn = () => {
    setHandleBtns(true);
  };

  const owner = comments.owner;
  let ownerData = "";
  return (
    <div className="comments">
      <h2>{comments.lenght || "000"}&nbsp;Comments</h2>
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
          <form onSubmit={handlesubmit}>
            <input
              onFocus={handleBtn}
              type="text"
              placeholder="Add a comment..."
              {...register("comment")}
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
        <CommentComponent comments={comments} />
      </div>
    </div>
  );
};

export default Comments;
