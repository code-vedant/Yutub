import "../../style/post.css";
import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import TweetService from "../../service/tweet";
import LikeService from "../../service/like";
import CommentService from "../../service/comment";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  const getPostLike = useCallback(async () => {
    try {
      const res = await LikeService.getTweetLikes(post._id);
      setLikes(res.data);
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch post likes")
      );
    }
  }, []);

  const getPostComment = useCallback(async () => {
    try {
      const res = await CommentService.getTweetComments(post._id);
      setComments(res.data);
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message || "Failed to fetch post comments"
        )
      );
    }
  }, []);

  useEffect(() => {
    getPostLike();
    getPostComment();
  }, [getPostLike, getPostComment]);

  return (
    <Link to={`/post/${post._id}`} className="post-card">
      {post?.ownerDetails && (
        <div className="post-header">
          <div className="post-avatar">
            <img src={post.ownerDetails?.avatar} alt="" />
          </div>
          <div className="post-user-info">
            <span className="post-user-name">
              {post ? post.ownerDetails?.fullName : "user name"}
            </span>
            <span className="post-username">
              {post?.ownerDetails?.username}
            </span>
          </div>
        </div>
      )}

      <div className="post-content">{post?.content}</div>

      <div className="post-actions">
        <div className="post-action" onClick={toggleLike}>
          {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
          <span>{likes?.length}</span>
        </div>

        <div className="post-action">
          <FaRegComment />
          <span>{comments.length}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
