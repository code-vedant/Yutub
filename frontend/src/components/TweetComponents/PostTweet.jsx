import React, { useState } from "react";
import "../../style/tweet.style.css";
import {useForm} from "react-hook-form"
import PopupHolder from "../PopupHolder";
import Loader from "../Loader";
import TweetService from "../../Service/tweet.js";
function PostTweet({accessToken}) {

    const {register , handleSubmit} = useForm()
    const [loading,SetLoading] = useState(false)
    const [error, setError] = useState("")

    const onSubmit = (data) => {
        console.log(data)
    }

    const PostTweet = async (data) => {
        setError("")
        try {
        SetLoading(true)
            await TweetService.createTweet(accessToken,data)
            SetLoading(false)
            window.location.reload()
        } catch (error) {
            console.error(error.message);
            setError(error.message)
            
        }
    }

  return (
    <div className="PostTweet-main">
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <form onSubmit={handleSubmit(PostTweet)}>
        <textarea placeholder="Write a tweet..." {...register("content")}/>
        {error && <p>{error}</p>}
        <button type="submit">
            Send
        </button>
      </form>
    </div>
  );
}

export default PostTweet;
