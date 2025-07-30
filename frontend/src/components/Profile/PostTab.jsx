import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import TweetService from "../../service/tweet";
import PostCard from "../TweetComponents/PostCard";
import "../../style/profile/PostTab.css";

export default function PostTab({ id }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await TweetService.getTweets(id);
      setPosts(res.data || []);
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Failed to fetch posts"));
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="PostTab_Main">
     {posts.length > 0 ? (
      <div className="PostTab_Container">
        {posts.map((post) => (
          <PostCard key={post._id} post={post}  />
        ))}
      </div>
     ) : (
      <div className="PostTab_NoPosts">
        <p>No posts available.</p>
      </div>
     )}
    </div>
  );
}
