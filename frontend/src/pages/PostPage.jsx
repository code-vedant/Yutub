import React, { useCallback, useEffect, useState } from "react";
import "../style/postDetailed.css";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/globalError";
import TweetService from "../service/tweet";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import LikeService from "../service/like";
import CommentService from "../service/comment";
import { useForm } from "react-hook-form";
import CommentComponent from "../components/VideoComponents/CommentComponent";

export default function PostPage() {
  const { id: postId } = useParams();



  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const {handleSubmit,register } = useForm()

  const accessToken = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();

  const getPost = async () => {
    if (!postId) {
      dispatch(setError("Post ID is required"));
      return;
    }
    try {
      console.log(postId);

      const res = await TweetService.getTweetById(postId);
      console.log(res.data);
      setPost(res.data);
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message || "Failed to fetch post details"
        )
      );
    }
  };

  const toggleLike = async () => {
    try {
      const res = await LikeService.toggleTweetLike(accessToken, postId);
      console.log(res.data);
      if (res.data !== null) {
        setLiked(true);
      }else{
        setLiked(false);
      }
      getPostLike()
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to toggle like")
      );
    }
  };

  const getPostLike = useCallback(async () => {
    try {
      const res = await LikeService.getTweetLikes(postId);
      setLikes(res.data);
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch post likes")
      );
    }
  }, []);

  const getPostComment = useCallback(async () => {
    try {
      const res = await CommentService.getTweetComments(postId);
      console.log(res.data);
      
      setComments(res.data);
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message || "Failed to fetch post comments"
        )
      );
    }
  }, []);

  const AddComment = async (data) => {
    console.log(data);
    
    try {
      const res = await CommentService.addTweetComment(
        accessToken,
        postId,
        data
      );
      getPostComment()

      console.log(res.data);
      
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Failed to add comment")
      );
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getPostLike();
    getPostComment();
  }, [postId,getPostLike, getPostComment]);



  return (
    <section className="PostPage-main">
      <div className="PP-tweetSection">
        <div className="post-header">
          <div className="post-avatar">
            <img src={post.owner?.avatar} alt="" />
          </div>
          <div className="post-user-info">
            <span className="post-user-name">
              {post ? post.owner?.fullName : "user name"}
            </span>
            <span className="post-username">{post?.owner?.username}</span>
          </div>
        </div>
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
      </div>
      <div className="PP-commentSection">
        <form  onSubmit={handleSubmit(AddComment)} className="comment-form">
            <input type="text" {...register("content")} />
            <button type="submit">Comment</button>
        </form>
        <div className="comment-list">
            <CommentComponent accessToken={accessToken} comments={comments} />
        </div>
      </div>
      
    </section>
  );
}
