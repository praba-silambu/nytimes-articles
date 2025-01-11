import React from "react";

const ArticleDetail = ({ article }) => (
  <div style={{ flex: 2, padding: "10px" }}>
    <h2>{article.title}</h2>
    <p>{article.abstract}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      Read More
    </a>
  </div>
);

export default ArticleDetail;
