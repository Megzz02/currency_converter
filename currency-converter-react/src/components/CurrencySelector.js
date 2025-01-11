import React from "react";

const CurrencySelector = ({ label, selectedCurrency, onCurrencyChange, rates }) => {
  return (
    <div>
      <label>{label} Currency:</label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
