import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/globalError";
import TweetService from "../../service/tweet";

export default function PostTab({ id }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await TweetService.getTweets(id);
      console.log("Fetched Posts:", res.data);
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
          <Link to={`/post/${post._id}`} key={post._id} className="PostTab_Post">
            <div className="PostTab_PostContent">
              <p>{post.content}</p>
              {post.images && post.images.length > 0 && (
                <img src={post.images[0]} alt="Post" />
              )}
            </div>
          </Link>
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
