import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SelectInput = ({
  options,
  onChange,
  id,
  value,
  icon,
  marginTop,
  marginRight,
  backgroundColor,
  iconColor,
  title,
  width,
  optionColor,
}) => {
  return (
    <div
      className="select-input"
      style={{
        marginTop: `${marginTop}px`,
        marginRight: `${marginRight}px`,
        backgroundColor: backgroundColor,
      }}
    >
      <FontAwesomeIcon icon={icon} className="icon" color={iconColor} />
      <select
        onChange={(e) => onChange(e)}
        id={id}
        value={value}
        required="required"
        style={{ width: width }}
      >
        <option disabled hidden value={""}>
          {title}
        </option>
        {options.map((option, index) => (
          <option
            value={option}
            key={index}
            style={{
              color: optionColor(option),
            }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
