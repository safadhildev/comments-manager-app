import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/Card";
import "./index.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = async () => {
    try {
      const promise = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      if (promise?.status === 200) {
        const results = await promise.json();
        setData(results);
        setIsError(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.log("App - getData() - error => ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const renderItem = (item, index) => {
    const { id, userId, body, title } = item;

    return (
      <div>
        <Card id={id} title={title} body={body} />
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <h1>Fetching Data ...</h1>;
    }

    if (isError) {
      return <h1>Oops, something went wrong.</h1>;
    }

    if (data) {
      return data.map(renderItem);
    }
  };
  return (
    <div className="home-body">
      <div className="header-wrapper">
        <h1 className="home-title">COMMENTS MANAGER APP</h1>
        <h3 className="home-subtitle">Created by: Syed Ahmad Fadhil</h3>
      </div>
      <div className="content-body">{renderContent()}</div>
    </div>
  );
};

export default Home;
