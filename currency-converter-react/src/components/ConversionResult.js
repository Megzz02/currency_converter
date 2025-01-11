import React from "react";

const ConversionResult = ({ amount, fromCurrency, toCurrency, convertedAmount }) => {
  return (
    <div>
      <h2>
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </h2>
    </div>
  );
};

export default ConversionResult;
