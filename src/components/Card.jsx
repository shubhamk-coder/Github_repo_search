import React from "react";

const Card = ({ repo }) => {
  return (
    <div className="card">
      <img src={repo.owner.avatar_url} alt="avatar" className="avatar" />
      <div className="container">
        <h4>
          <b>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="name"
            >
              {repo.name}
            </a>
          </b>
        </h4>
        <p>{repo.description}</p>
        <p>{(repo.stargazers_count / 1000).toFixed(1)}k Stars</p>
        <p>{repo.language}</p>
      </div>
    </div>
  );
};

export default Card;
