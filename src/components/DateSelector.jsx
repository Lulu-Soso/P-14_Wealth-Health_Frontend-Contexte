import React from "react";

const DateSelector = ({ label, value, onChange }) => {
  return (
    <div className="field">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type="date"
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
