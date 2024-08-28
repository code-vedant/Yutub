import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <strong>{comment.user}</strong>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
