import React from "react";

const FavoritePairs = ({ favorites, onSelectPair, onRemovePair }) => {
  return (
    <div>
      <h3>Favorite Currency Pairs:</h3>
      <ul>
        {favorites.map((pair, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {/* Clickable Favorite Pair */}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                marginRight: "10px",
              }}
              onClick={() => onSelectPair(pair)}
            >
              {pair}
            </span>
            {/* Remove Button */}
            <button
              onClick={() => onRemovePair(pair)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePairs;
