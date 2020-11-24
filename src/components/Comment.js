import React from "react";
import "../styles/Comment.css";

const Comment = ({ email, name, body }) => {
  return (
    <div className="comment-container">
      <p className="comment-user-info">
        <strong>{name}</strong>
        {"\t"}
        {email}
      </p>
      <p className="comment-body">{body}</p>
    </div>
  );
};

export default Comment;
