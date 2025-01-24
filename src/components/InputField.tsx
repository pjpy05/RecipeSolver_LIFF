import React from "react";

interface Props {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}

const InputField: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{name}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "5px 0" }}
      />
    </div>
  );
};

export default InputField;
