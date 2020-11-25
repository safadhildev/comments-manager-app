import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import "../styles/Comment.css";

const Comment = ({
  email,
  name,
  body,
  searchValue,
  searching,
  shouldHighlight,
}) => {
  return (
    <div className="comment-container">
      <p className="comment-user-info">
        <strong>
          <Highlighter
            highlightClassName="highlight"
            searchWords={
              searching &&
              (shouldHighlight.toUpperCase() === "ALL" ||
                shouldHighlight.toUpperCase() === "NAME")
                ? [searchValue]
                : []
            }
            autoEscape={true}
            textToHighlight={name}
          />
        </strong>
        {"\t"}
        <Highlighter
          highlightClassName="highlight"
          searchWords={
            searching &&
            (shouldHighlight.toUpperCase() === "ALL" ||
              shouldHighlight.toUpperCase() === "EMAIL")
              ? [searchValue]
              : []
          }
          autoEscape={true}
          textToHighlight={email}
        />
      </p>
      <p className="comment-body">
        <Highlighter
          highlightClassName="highlight"
          searchWords={
            searching &&
            (shouldHighlight.toUpperCase() === "ALL" ||
              shouldHighlight.toUpperCase() === "COMMENT")
              ? [searchValue]
              : []
          }
          autoEscape={true}
          textToHighlight={body}
        />
      </p>
    </div>
  );
};

export default Comment;
