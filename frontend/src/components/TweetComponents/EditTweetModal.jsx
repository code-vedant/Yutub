import React, { useState } from "react";
import "../../style/tweet.style.css";
import PopupHolder from "../PopupHolder.jsx"
import Loader from "../Loader"
import {useForm} from "react-hook-form"
import TweetService from "../../Service/tweet";

function EditTweetModal({ closeEditModal ,accessToken,tweetId}) {
    const [loading,setLoading] =useState(false)

    const {register, handleSubmit} = useForm()

    const handleEdit =async (data) => {
        setLoading(true)
      try {
        await TweetService.updateTweet(accessToken,tweetId,data)
        setLoading(false)
      } catch (error) {
        console.error(error.message)
        setLoading(false)
      }
    };
  return (
    <div className="etm-main">
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
      <form onSubmit={handleSubmit(handleEdit)}>
        <h2>Edit Tweet</h2>
        <textarea placeholder="Edit your tweet here..." {...register("content")} />
        <div className="etm-btn">
          <button onClick={closeEditModal}>Cancel</button>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditTweetModal;
