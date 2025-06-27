import React, { useState } from "react";
import robot from "../../assets/robot.png";
import PopupHolder from "../PopupHolder";
import { useForm } from "react-hook-form";
import { BiLike ,BiSolidLike } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import CommentService from "../../service/comment";
import LikeService from "../../service/like";
import {
  addLikedComment,
  removeLikedComment,
} from "../../store/LikesSlice";
import DeleteCommentModal from "./DeleteCommentModal";

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
          <div key={comment.id} className="comment-box">
            <div className="comment-left">
              <div className="comment-user-img">
                <img src={owner.avatar || robot} alt="" />
              </div>
            </div>
            <div className="comment-right">
              <div className="comment-user-date">
                <span>{owner.fullName}</span>
                <span>{timeAgo(comment.createdAt)}</span>
                {userData?._id === owner?._id && (
                  <div className="editComment">
                    <>
                      <button
                        className="editBtn"
                        onClick={() => {
                          setCommentId(comment?._id);
                          handleUpdateModal();
                        }}
                      >
                        <LuPencil className="edit-icon" />
                        
                      </button>

                      <button
                        className="editBtn"
                        onClick={() => {
                          setCommentId(comment?._id);
                          handleDeleteModal();
                        }}
                      >
                        <MdOutlineDelete className="edit-icon" />
                      </button>
                    </>
                  </div>
                )}
              </div>
              <div className="comment-text">
                <p>
                  {comment.content}</p>
                  <button className="comment-like-button">
                    {false ? <BiSolidLike/> : <BiLike/>}
                  </button>
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
         <DeleteCommentModal closeDeleteModal={closeDeleteModal} deleteComment={deleteComment}/>
        </PopupHolder>
      )}
    </div>
  );
}

export default CommentComponent;
