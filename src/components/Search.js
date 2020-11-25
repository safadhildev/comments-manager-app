import React, { useState } from "react";
import "../styles/Search.css";

const options = ["All", "Name", "Email", "Comment"];

const Search = ({
  value,
  onChange,
  search,
  onPressSearch,
  onChangeOption,
  selectedOption,
}) => {
  const getPlaceHolderText = () => {
    switch (selectedOption.toUpperCase()) {
      case "NAME":
        return "by Name";
      case "EMAIL":
        return "by Email";
      case "COMMENT":
        return "by User Comments";
      default:
        return "";
    }
  };

  const renderOption = (item, index) => {
    return <option value={item}>{item}</option>;
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          placeholder={`Filter comments ${getPlaceHolderText()} . . .`}
          onChange={(text) => {
            onChange(text);
          }}
          value={value}
        />
      </div>
      <div className="dropdown-container">
        <select
          className="dropdown"
          value={selectedOption}
          onChange={(e) => {
            onChangeOption(e.target.value);
          }}
        >
          {options.map(renderOption)}
        </select>
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
