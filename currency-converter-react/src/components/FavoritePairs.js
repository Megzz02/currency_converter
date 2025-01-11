import React from "react";

const FavoritePairs = ({ favorites }) => {
  return (
    <div>
      <h3>Favorite Currency Pairs:</h3>
      <ul>
        {favorites.map((pair, index) => (
          <li key={index}>{pair}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePairs;
