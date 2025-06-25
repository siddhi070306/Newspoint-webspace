import React, { useEffect, useState } from "react";
import generalImg from "../assets/general.avif";
import healthImg from "../assets/health.avif";
import nationImg from "../assets/nation.avif";
import scienceImg from "../assets/science.avif";
import technologyImg from "../assets/technology.avif";
import sportsImg from "../assets/sports.avif";
import "./News.css";
import axios from "axios";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "health",
  "sports",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCateogory, setSelectedCateogory] = useState("general");
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCateogory}&lang=en&apikey=349a1e40e908c2df08e052f01521ca9f`;
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;
      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      console.log(fetchedNews.slice(1, 7));
    };
    fetchNews();
  }, [selectedCateogory]);
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCateogory(category);
  };
  return (
    <div className="news-app">
      <div className="news-header">
        <h1 className="logo">Breaking News</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">Categories:</h1>
          <div className="categories">
            {categories.map((category) => (
              <a
                href="#"
                className="nav-link"
                key={category}
                onClick={(e) => handleCategoryClick(e, category)}
              >
                {category}
              </a>
            ))}
          </div>
        </nav>
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image} alt="headline img" />
              <h2 className="headline-title">{headline.title}</h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div className="news-item" key={index}>
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
