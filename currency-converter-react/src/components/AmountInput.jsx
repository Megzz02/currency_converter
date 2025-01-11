import React from "react";

const AmountInput = ({ amount, onAmountChange }) => {
  return (
    <div>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
      />
    </div>
  );
};

export default AmountInput;
