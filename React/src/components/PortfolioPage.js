import React from "react";
import { Link } from "react-router-dom";

const PortfolioPage = () => (
  <div>
    <h1>Your portfolio</h1>
    <p>Here are your projects</p>
    <Link to="portfolio/1">First project</Link>
    <Link to="portfolio/2">Second project</Link>
  </div>
);

export default PortfolioPage;
