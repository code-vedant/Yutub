import React from 'react'
import robot from "../assets/robot.png"

function CommentComponent({comments}) {
  return (
    <div className='CommentComponent'>
        {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-left">
            <div className="comment-user-img">
                <img src={robot} alt="" />
            </div>
          </div>
          <div className="comment-right">
            <div className="comment-user-date">
                <span>{comment.user || "Full Name"}</span>
                <span>{comment.date || "5 days ago"}</span>
            </div>
            <div className="comment-text">
                <p>{comment.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentComponent