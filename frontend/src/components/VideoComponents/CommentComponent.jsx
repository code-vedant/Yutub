import { useState, useCallback } from "react";
import robot from "../../assets/robot.png";
import PopupHolder from "../PopupHolder";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import CommentService from "../../service/comment";
import LikeService from "../../service/like";
import {
  addLikedComment,
  removeLikedComment,
} from "../../store/LikesSlice";
import DeleteModal from "../modals/DeleteModal";
import UpdateCommentModal from "../modals/UpdateCommentModal";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { setError } from "../../store/globalError";
import "../../style/commentComponent.css"; 

function CommentComponent({ accessToken, comments, onCommentUpdate }) {
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  
  const userData = useSelector((state) => state.auth.userData);
  const likedComments = useSelector((state) => state.like.likedComments);
  const dispatch = useDispatch();

  // Modal handlers
  const handleDeleteModal = useCallback((id) => {
    setCommentId(id);
    setDeleteModal(true);
  }, []);

  const handleUpdateModal = useCallback((id) => {
    setCommentId(id);
    setUpdateModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
    setCommentId("");
  }, []);

  const closeUpdateModal = useCallback(() => {
    setUpdateModal(false);
    setCommentId("");
  }, []);

  // API operations
  const updateComment = useCallback(async (data) => {
    if (!commentId) return;
    setLoading(true);
    try {
      await CommentService.updateComment(accessToken, commentId, data);
      closeUpdateModal();
      // Trigger refresh if callback provided
      onCommentUpdate?.();
    } catch (error) {
      console.error("Failed to update comment:", error);
      dispatch(setError(error.response?.data?.message || "Failed to update comment"));
    } finally {
      setLoading(false);
    }
  }, [accessToken, commentId, closeUpdateModal, onCommentUpdate, dispatch]);

  const deleteComment = useCallback(async () => {
    if (!commentId) return;
    
    setLoading(true);
    try {
      await CommentService.deleteComment(accessToken, commentId);
      closeDeleteModal();
      // Trigger refresh if callback provided
      onCommentUpdate?.();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      dispatch(setError(error.response?.data?.message || "Failed to delete comment"));
    } finally {
      setLoading(false);
    }
  }, [accessToken, commentId, closeDeleteModal, onCommentUpdate, dispatch]);

  const toggleLike = useCallback(async (commentId) => {
    if (!commentId) return;
    
    try {
      const response = await LikeService.toggleCommentLike(accessToken, commentId);
      
      if (response.success) {
        if (response.data === null) {
          dispatch(removeLikedComment(commentId));
        } else {
          dispatch(addLikedComment(commentId));
        }
      } else {
        console.error("Failed to toggle like:", response.message);
        dispatch(setError("Failed to toggle like"));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      dispatch(setError("Error toggling like"));
    }
  }, [accessToken, dispatch]);

  // Check if user owns the comment
  const isCommentOwner = useCallback((ownerId) => {
    return userData?._id === ownerId;
  }, [userData?._id]);

  // Check if comment is liked
  const isCommentLiked = useCallback((commentId) => {
    return likedComments.includes(commentId);
  }, [likedComments]);

  // Handle empty comments array
  if (!comments || comments.length === 0) {
    return (
      <div className="CommentComponent">
        <div className="comment-empty-state">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`CommentComponent ${loading ? 'loading' : ''}`}>
      {comments.map((comment) => {
        // Handle both array and object formats for owner
        const owner = Array.isArray(comment.owner) ? comment.owner[0] : comment.owner;
        
        // Safety checks
        if (!comment._id) {
          console.warn("Comment missing _id:", comment);
          return null;
        }

        const isOwner = isCommentOwner(owner?._id);
        const isLiked = isCommentLiked(comment._id);
        
        return (
          <div key={comment._id} className="comment-box">
            <div className="comment-left">
              <div className="comment-user-img">
                <img 
                  src={owner?.avatar || robot} 
                  alt={`${owner?.fullName || 'User'}'s avatar`}
                  onError={(e) => {
                    e.target.src = robot; // Fallback to robot image on error
                  }}
                />
              </div>
            </div>
            
            <div className="comment-right">
              <div className="comment-right-header">
                <span>{owner?.fullName || 'Anonymous User'}</span>
                <span className="time">• {getTimeAgo(comment.createdAt)}</span>
                
                {isOwner && (
                  <div className="editComment">
                    <button
                      className="editBtn"
                      onClick={() => handleUpdateModal(comment._id)}
                      disabled={loading}
                      aria-label="Edit comment"
                      type="button"
                    >
                      <LuPencil className="edit-icon" />
                    </button>

                    <button
                      className="editBtn"
                      onClick={() => handleDeleteModal(comment._id)}
                      disabled={loading}
                      aria-label="Delete comment"
                      type="button"
                    >
                      <MdOutlineDelete className="edit-icon" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="comment-text">
                <p>{comment.content || 'No content available'}</p>
                <button 
                  className="comment-like-button" 
                  onClick={() => toggleLike(comment._id)}
                  disabled={loading}
                  aria-label={isLiked ? "Unlike comment" : "Like comment"}
                  type="button"
                >
                  {isLiked ? <BiSolidLike /> : <BiLike />}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Update Modal */}
      {updateModal && (
        <PopupHolder>
          <UpdateCommentModal 
            updateFn={updateComment} 
            closeFn={closeUpdateModal}
            loading={loading}
            comment={comments.find(c => c._id === commentId)}
          />
        </PopupHolder>
      )}
      
      {/* Delete Modal */}
      {deleteModal && (
        <PopupHolder>
          <DeleteModal 
            closeFn={closeDeleteModal} 
            deleteFn={deleteComment} 
            item="comment"
            loading={loading}
          />
        </PopupHolder>
      )}
    </div>
  );
}

export default CommentComponent;