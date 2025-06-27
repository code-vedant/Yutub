import { useCallback, useEffect, useState } from "react";
import "../style/postpage.css";
import TweetService from "../service/tweet";
import PostCard from "../components/TweetComponents/PostCard";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const accessToken = useSelector((state) => state.auth.accessToken);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
    const res = await TweetService.getAllTweets();
      console.log("Fetched tweets:", res.data.docs);
      setPosts(res.data.docs);
    } catch (error) {
      console.error(
        "Error fetching photos:",
        error.response?.data?.message || error.message
      );
      setError((prev) => ({ ...prev, photos: error.message }));
    }finally{
      setIsLoading(false);
    }
  },[]);

  useEffect(()=>{
    fetchPhotos()
  },[fetchPhotos])

  return (
    <section className="post_page">
      <div className="post_render_area">
        {posts.length > 0 && posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
