import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const styles = {
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
};

const Card = ({ id, title, body }) => {
  return (
    <Link style={styles.link} to={`details/${id}`}>
      <div style={styles.container} className="card-container">
        <div className="card-content-title-wrapper">
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-content-body-wrapper">
          <p className="card-body">{body}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
