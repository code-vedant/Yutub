import React, { useState } from "react";
import robot from "../assets/robot.png";
import PopupHolder from "./PopupHolder";
import { useForm } from "react-hook-form";
import bin from "../assets/bin.png";
import edit from "../assets/edit.png";
import like from "../assets/like.png";
import liked from "../assets/liked.png";
import { useDispatch, useSelector } from "react-redux";
import CommentService from "../Service/comment";
import LikeService from "../Service/like";
import {
  addLikedComment,
  removeLikedComment,
} from "../store/LikesSlice";

function CommentComponent({ accessToken, comments }) {
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };
  const handleUpdateModal = () => {
    setUpdateModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const updateComment = async (data) => {
    try {
      await CommentService.updateComment(accessToken, commentId, data);
      setUpdateModal(false);
    } catch (error) {
      console.error(error);
      setUpdateModal(false);
    }
  };

  const deleteComment = async () => {
    try {
      await CommentService.deleteComment(accessToken, commentId);
      setDeleteModal(false);
    } catch (error) {
      console.error(error);
      setDeleteModal(false);
    }
  };

  const toggleLike = async (commentId) => {
    try {
      const response = await LikeService.toggleCommentLike(
        accessToken,
        commentId
      );
      if (response.success) {
        if (response.data === null) {
          dispatch(removeLikedComment(commentId));
        } else {
          dispatch(addLikedComment(commentId));
        }
      } else {
        console.error("Failed to toggle like:", response.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const likedComment = useSelector((state) => state.like.likedComments);

  return (
    <div className="CommentComponent">
      {comments.map((comment) => {
        const owner = comment.owner[0];
        return (
          <div key={comment.id} className="comment">
            <div className="comment-left">
              <div className="comment-user-img">
                <img src={owner.avatar || robot} alt="" />
              </div>
            </div>
            <div className="comment-right">
              <div className="comment-user-date">
                <span>{owner.fullName || "Full Name"}</span>
                <span>{timeAgo(comment.createdAt) || "5 days ago"}</span>
                <div
                  className="CLikeBtn"
                  onClick={() => {
                    toggleLike(comment?._id);
                  }}
                >
                  <img
                    src={likedComment.includes(comment?._id) ? liked : like}
                    alt="Edit"
                  />
                </div>
                {userData?._id === owner?._id && (
                  <div className="editComment">
                    <>
                      <div
                        className="CeditBtn"
                        onClick={() => {
                          setCommentId(comment?._id);
                          handleUpdateModal();
                        }}
                      >
                        <img src={edit} alt="Edit" />
                        <h3>0 likes</h3>
                      </div>

                      <div
                        className="CdeleteBtn"
                        onClick={() => {
                          setCommentId(comment?._id);
                          handleDeleteModal();
                        }}
                      >
                        <img src={bin} alt="Delete" />
                      </div>
                    </>
                  </div>
                )}
              </div>
              <div className="comment-text">
                <p>
                  {comment.content ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {updateModal && (
        <PopupHolder>
          <div className="updateCommentBox">
            <h2>Update Comment</h2>
            <form onSubmit={handleSubmit(updateComment)}>
              <textarea
                type="text"
                placeholder="Write a comment..."
                {...register("content")}
              />
              <div className="btnss">
                <button onClick={closeUpdateModal}>Cancel</button>
                <button type="submit">update</button>
              </div>
            </form>
          </div>
        </PopupHolder>
      )}
      {deleteModal && (
        <PopupHolder>
          <div className="deleteCommentBox">
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete this comment.</p>
            <div className="Dbtnss">
              <button onClick={closeDeleteModal}>Cancel</button>
              <button onClick={deleteComment}>Delete</button>
            </div>
          </div>
        </PopupHolder>
      )}
    </div>
  );
}

export default CommentComponent;
