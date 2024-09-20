import React, { useState } from 'react'
import PopupHolder from "../PopupHolder.jsx"
import Loader from "../Loader"
import TweetService from "../../Service/tweet.js"

function DeleteTweet({closeDeleteModal,accessToken,tweetId}) {
    const [loading,setLoading] =useState(false)

    const deleteTweet = async () => {
        setLoading(true)
        try {
            await TweetService.deleteTweet(accessToken,tweetId)
            setLoading(false)
            closeDeleteModal()
        } catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className='dt-main'>
        {loading && (
        <PopupHolder>
          <Loader />
        </PopupHolder>
      )}
        <h1>Delete Tweet</h1>
        <p>Are you sure you want to delete this tweet?</p>
        <div className="dt-btn">
          <button onClick={closeDeleteModal}>Cancel</button>
          <button onClick={deleteTweet}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteTweet