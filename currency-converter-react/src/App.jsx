import React, { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector.jsx";
import AmountInput from "./components/AmountInput.jsx";
import ConversionResult from "./components/ConversionResult.jsx";
import FavoritePairs from "./components/FavoritePairs.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import "./App.css";

const App = () => {
  // States
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [favorites, setFavorites] = useState([]);

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

  // Fetch exchange rates whenever `fromCurrency` changes
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, [fromCurrency]);

  // Calculate converted amount whenever inputs change
  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

  // Add to favorites
  const addFavorite = () => {
    const pair = `${fromCurrency} -> ${toCurrency}`;
    if (!favorites.includes(pair)) {
      setFavorites([...favorites, pair]);
    }
  };

  // Select a favorite pair
  const onSelectPair = (pair) => {
    const [from, to] = pair.split(" -> ");
    setFromCurrency(from);
    setToCurrency(to);
  };

  // Remove a favorite pair
  const onRemovePair = (pair) => {
    setFavorites(favorites.filter((favorite) => favorite !== pair));
  };

  return (
    <div className="app">
      {/* Dark Mode Toggle */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Title */}
      <h1>Currency Converter</h1>

      {/* Currency Selectors */}
      <CurrencySelector
        label="From"
        selectedCurrency={fromCurrency}
        onCurrencyChange={setFromCurrency}
        rates={rates}
      />
      <CurrencySelector
        label="To"
        selectedCurrency={toCurrency}
        onCurrencyChange={setToCurrency}
        rates={rates}
      />

      {/* Amount Input */}
      <AmountInput amount={amount} onAmountChange={setAmount} />

      {/* Conversion Result */}
      <ConversionResult
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
      />

      {/* Add to Favorites Button */}
      <button onClick={addFavorite}>Add to Favorites</button>

      {/* Favorite Currency Pairs */}
      <FavoritePairs
        favorites={favorites}
        onSelectPair={onSelectPair}
        onRemovePair={onRemovePair}
      />
    </div>
  );
};

export default App;
