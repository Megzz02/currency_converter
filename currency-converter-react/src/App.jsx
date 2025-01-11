import React, { useState, useEffect } from "react";
import CurrencySelector from "./components/CurrencySelector.jsx";
import AmountInput from "./components/AmountInput.jsx";
import ConversionResult from "./components/ConversionResult.jsx";
import FavoritePairs from "./components/FavoritePairs.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

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

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [rates, toCurrency, amount]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const addFavorite = () => {
    const pair = `${fromCurrency} -> ${toCurrency}`;
    if (!favorites.includes(pair)) {
      setFavorites([...favorites, pair]);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1>Currency Converter</h1>
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
