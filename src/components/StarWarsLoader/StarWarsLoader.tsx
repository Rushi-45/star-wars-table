import React from "react";
import "./StarWarsLoader.module.css";

const StarWarsLoader: React.FC = () => {
  return (
    <div className="star-wars-loader">
      <div className="star-wars-loader__spinner"></div>
    </div>
  );
};

export default StarWarsLoader;
