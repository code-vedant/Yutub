import "../../style/post.css"
import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";

const PostCard = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(24); // example
  const [commentsCount] = useState(12); // example

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
            <img src={post.ownerDetails.avatar} alt="" />
        </div>
        <div className="post-user-info">
          <span className="post-user-name">{post ? post.ownerDetails.fullName : "user name"}</span>
          <span className="post-username">{post?.ownerDetails.username}</span>
        </div>
      </div>

      <div className="post-content">
        {post?.content}
      </div>

      <div className="post-actions">
        <div className="post-action" onClick={toggleLike}>
          {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
          <span>{likesCount}</span>
        </div>

        <div className="post-action">
          <FaRegComment />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
