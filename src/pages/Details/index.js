import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Comment from "../../components/Comment";
import Search from "../../components/Search";
import "./index.css";

const Details = ({ match }) => {
  const { id } = match?.params;
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterComments, setFilterComments] = useState([]);
  const [isLiveSearch, setIsLiveSearch] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");

  const getData = async () => {
    try {
      const promise = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (promise?.status === 200) {
        const results = await promise.json();
        setData(results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.log("Details - getData() - error => ", error);
    }
  };

  const getComments = async () => {
    try {
      const promise = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      if (promise?.status === 200) {
        const results = await promise.json();
        setComments(results);
      }
    } catch (error) {
      console.log("Details - getComments() - error => ", error);
    }
  };

  const getFilter = () => {
    switch (selectedOption.toUpperCase()) {
      case "NAME": {
        console.log("FILTERING BY NAME ...");
        return comments.filter((comment) =>
          comment.name.toUpperCase().includes(searchValue.toUpperCase())
        );
      }
      case "EMAIL":
        return comments.filter((comment) =>
          comment.email.toUpperCase().includes(searchValue.toUpperCase())
        );
      case "COMMENTS":
        return comments.filter((comment) =>
          comment.body.toUpperCase().includes(searchValue.toUpperCase())
        );
      default:
        return comments.filter(
          (comment) =>
            comment.name.toUpperCase().includes(searchValue.toUpperCase()) ||
            comment.email.toUpperCase().includes(searchValue.toUpperCase()) ||
            comment.body.toUpperCase().includes(searchValue.toUpperCase())
        );
    }
  };

  const onFilterComments = () => {
    setSearching(true);
    if (searchValue && filterComments !== "") {
      const filter = getFilter();
      setFilterComments(filter);
    } else {
      setFilterComments(comments);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
    getComments();
  }, [id]);

  useEffect(() => {
    setSearching(false);
    if (isLiveSearch) {
      onFilterComments();
    }
  }, [searchValue]);

  const onChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const onCheckLiveSearch = () => {
    setIsLiveSearch(!isLiveSearch);
  };

  const renderComment = (item, index) => {
    const { email, name, body } = item;
    return (
      <Comment
        email={email}
        name={name}
        body={body}
        searchValue={searchValue}
        searching={searching}
        shouldHighlight={selectedOption}
      />
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h1>Getting data ... </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loading-container">
        <h1>Error getting data {`:(`} </h1>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <p className="details-title">{data?.title}</p>
        <p className="details-body">{data?.body}</p>
      </div>
      <div className="search-header">
        <p className="search-title">Comments</p>
        <Search
          onChange={onChange}
          value={searchValue}
          search={!isLiveSearch}
          onPressSearch={() => onFilterComments()}
          onChangeOption={(val) => setSelectedOption(val)}
          selectedOption={selectedOption}
        />
        <label>
          <input
            type="checkbox"
            name="live search"
            value="liveSearch"
            checked={isLiveSearch}
            onClick={() => onCheckLiveSearch()}
          />
          Enable live search
        </label>
      </div>
      {searching ? (
        filterComments?.length > 0 ? (
          filterComments.map(renderComment)
        ) : (
          <h3>No comments found</h3>
        )
      ) : comments?.length > 0 ? (
        comments.map(renderComment)
      ) : (
        <h3>No comments found</h3>
      )}
    </div>
  );
};

export default Details;
