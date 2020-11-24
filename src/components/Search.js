import React from "react";
import "../styles/Search.css";

const Search = ({ value, onChange, search, onPressSearch }) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          placeholder="Search comments by name/email/comment . . ."
          onChange={(text) => {
            onChange(text);
          }}
          value={value}
        />
      </div>
      {search && (
        <button className="search-button" onClick={onPressSearch}>
          Search
        </button>
      )}
    </div>
  );
};

export default Search;
