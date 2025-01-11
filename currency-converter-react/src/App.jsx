import React, { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector.jsx";
import AmountInput from "./components/AmountInput.jsx";
import ConversionResult from "./components/ConversionResult.jsx";
import FavoritePairs from "./components/FavoritePairs.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import "./App.css";

const App = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // Apply dark or light class to body
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // Mock state for currency data and favorite pairs
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0.85);
  const [favorites, setFavorites] = useState([]);

  // Add to favorites
  const addFavorite = () => {
    const pair = `${fromCurrency} -> ${toCurrency}`;
    if (!favorites.includes(pair)) {
      setFavorites([...favorites, pair]);
    }
  };

  return (
    <div className="app">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1>Currency Converter</h1>
      <CurrencySelector
        label="From"
        selectedCurrency={fromCurrency}
        onCurrencyChange={setFromCurrency}
        rates={{ USD: 1, EUR: 0.85, EGP: 15.7 }}
      />
      <CurrencySelector
        label="To"
        selectedCurrency={toCurrency}
        onCurrencyChange={setToCurrency}
        rates={{ USD: 1, EUR: 0.85, EGP: 15.7 }}
      />
      <AmountInput amount={amount} onAmountChange={setAmount} />
      <ConversionResult
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
      />
      <button onClick={addFavorite}>Add to Favorites</button>
      <FavoritePairs favorites={favorites} />
    </div>
  );
};

export default App;
