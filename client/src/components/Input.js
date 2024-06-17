import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Input = ({
  children,
  type,
  val,
  onChange,
  icon,
  size,
  inline,
  width,
  height,
  length,
  marginBottom,
  id,
  backgroundColor,
  inPadding,
  inMargin,
  marginRight,
  marginLeft,
  marginTop,
  required,
  question,
}) => {
  const [realType, setRealType] = useState(type);

  return (
    <div
      className="input-text"
      style={{
        display: `${inline ? "inline-flex" : "flex"}`,
        marginTop: `${marginTop}px`,
      }}
    >
      {size != "small" && (
        <FontAwesomeIcon icon={icon} color="white" className="input-icon" />
      )}
      {size == "big" ? (
        <textarea
          type={realType}
          required={`${required ? "required" : ""}`}
          className={`input-${type}-field`}
          value={val}
          onChange={onChange}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: backgroundColor,
          }}
          maxLength={length}
          id={id}
        />
      ) : (
        <input
          type={realType}
          required={`${required ? "required" : ""}`}
          className={`input-${type}-field`}
          value={val}
          onChange={onChange}
          style={{
            width: `${
              size == "small"
                ? `${inPadding ? 50 - inPadding : 30.5}px`
                : `${type == "password" ? `${width - 40}px` : `${width}px`}`
            }`,
            height: `${size == "small" ? `50px` : `${height}px`}`,
            paddingLeft: `${
              size == "small" ? `${inPadding ? inPadding : 19.5}px` : `30px`
            }`,
            marginBottom: `${marginBottom}px`,
            backgroundColor: backgroundColor,
            marginRight: `${marginRight}px`,
            marginLeft: `${marginLeft}px`,
          }}
          maxLength={size == "small" ? `${length ? length : 1}` : length}
          id={id}
        />
      )}
      <span
        className={`${size == "small" && "small-input-span"}`}
        style={{
          marginLeft: `${size == "small" && `${inMargin ? inMargin : 39.5}px`}`,
          color: `${val && "#00dfc4"}`,
          transform: `${
            val &&
            `${size != "small" && "translateX(10px)"} translateY(-22.5px)`
          }`,
          backgroundColor: `${val && "#1B2130"}`,
          paddingLeft: `${val && "5px"}`,
          paddingRight: `${val && "5px"}`,
          borderWidth: `${val && "2px"}`,
          borderRadius: `${val && "5px"}`,
          border: `${val && "#00dfc4 solid"}`,
          fontSize: `${val && "10px"}`,
        }}
      >
        {children}
      </span>
      {type == "password" && (
        <FontAwesomeIcon
          icon={realType == "password" ? faEyeSlash : faEye}
          color="white"
          className="password-icon"
          onClick={() => {
            setRealType(realType == "password" ? "text" : "password");
          }}
        />
      )}
      {!required && !val && question && (
        <FontAwesomeIcon
          icon={faQuestion}
          style={{
            position: "absolute",
            right: "30px",
            top: "10px",
            color: "grey",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  icon: faUser,
  size: "normal",
  inline: false,
  width: 300,
  height: 50,
  marginBottom: 20,
  backgroundColor: "transparent",
  required: true,
  question: true,
};

export default Input;
