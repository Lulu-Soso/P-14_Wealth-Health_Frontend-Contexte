import React from "react";

const DropdownForm = ({ label, options, value, onChange }) => {
  return (
    <div className="field">
      <label htmlFor="{label.toLowerCase()}">{label}</label>
      <select
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownForm;
