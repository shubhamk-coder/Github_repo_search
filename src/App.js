import React, { useEffect, useState } from "react";
import "./App.css";
import search from "./assets/search.png";
import Card from "./components/Card";

function App() {
  const [input, setInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    if (!input) {
      return;
    }
    // make API caslls
    setIsLoading(true);
    fetch(`https://api.github.com/search/repositories?q=${input}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setError(false);
        setRepos(data.items);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        console.error(err);
      });
  }, [input]);

  useEffect(() => {
    if (!input) {
      return;
    }
    // make API caslls
    setIsLoading(true);
    fetch(
      `https://api.github.com/search/repositories?q=${input}&sort=${sort}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setError(false);
        setRepos(data.items);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
        console.error(err);
      });
  }, [input, sort, order]);

  const onChangeHandler = (e) => {
    if (
      e.target.value === "stars" ||
      e.target.value === "watchers" ||
      e.target.value === "scores"
    ) {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setSort(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setInput(e.target.elements.query.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="searchArea">
        <input
          type="text"
          name="query"
          id="query"
          className="query"
          placeholder="Search Github Repositories"
        />
        <button type="submit" className="btn">
          <img src={search} alt="search" className="searchIcon" />
        </button>
        <div className="sort">Sort By</div>
        <select className="select" onChange={onChangeHandler}>
          <option value="" defaultValue>
            None
          </option>
          <option value="stars">Stars</option>
          <option value="watchers">Watchers</option>
          <option value="scores">Score</option>
          <option value="name">Name</option>
          <option value="created">Created At</option>
          <option value="updated">Updated At</option>
        </select>
      </form>
      {isLoading && (
        <div>
          <i className="fa fa-spinner fa-spin"></i> Loading...
        </div>
      )}
      {error && (
        <div>
          Unexpected error occurred while fetching data. Please try again later!
        </div>
      )}
      <ul className="list">
        {repos.map((repo) => {
          return <Card repo={repo} key={repo.id} />;
        })}
      </ul>
    </div>
  );
}

export default App;
