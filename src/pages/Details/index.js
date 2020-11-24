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

  const getData = async () => {
    try {
      const promise = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (promise?.status === 200) {
        const results = await promise.json();
        setData(results);
      }
    } catch (error) {
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

  const onSearchComments = () => {
    setSearching(true);
    if (searchValue && filterComments !== "") {
      const filter = comments.filter(
        (comment) =>
          comment.name.toUpperCase().includes(searchValue.toUpperCase()) ||
          comment.email.toUpperCase().includes(searchValue.toUpperCase()) ||
          comment.body.toUpperCase().includes(searchValue.toUpperCase())
      );
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
    if (isLiveSearch) {
      onSearchComments();
    }
  }, [searchValue]);

  const onChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const onCheckLiveSearch = () => {
    console.log("current => ", isLiveSearch);
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
      />
    );
  };

  const renderComments = () => {
    const arr = filterComments?.length > 0 ? filterComments : comments;

    return arr.map((item, index) => {
      const { email, name, body } = item;
      return (
        <Comment
          email={email}
          name={name}
          body={body}
          searchValue={searchValue}
        />
      );
    });
  };

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
          onPressSearch={() => onSearchComments()}
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
