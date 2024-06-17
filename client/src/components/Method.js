import React, { useState } from "react";
import Input from "./Input";
import SelectInput from "./SelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCircle,
  faClock,
  faComment,
  faGripLinesVertical,
  faPen,
  faPlus,
  faQuestion,
  faScrewdriverWrench,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Method = ({
  method,
  handleChange,
  handleChangeNumber,
  index,
  onRemoveMethod,
  hidden,
  onClick,
  selectedMethod,
  provided,
  addEquipment,
  handleEquipmentChange,
  removeEquipment,
}) => {
  const optionColor = (option) => {
    return option == "Discussion"
      ? "#FF5722"
      : option == "Game"
      ? "#2196F3"
      : option == "Activity"
      ? "#8BC34A"
      : option == "Other"
      ? "grey"
      : "";
  };
  if (hidden)
    return (
      <div
        className="hidden-method"
        onClick={() => onClick(index)}
        style={{
          borderColor: `${selectedMethod == index ? "#00dfc4" : ""}`,
          backgroundColor: `${selectedMethod == index ? "#122E2D" : ""}`,
          cursor: `${selectedMethod == index ? "auto" : "pointer"}`,
        }}
      >
        {method.type && (
          <FontAwesomeIcon
            icon={faCircle}
            style={{
              color:
                method.type == "Game"
                  ? "#2196F3"
                  : method.type == "Discussion"
                  ? "#FF5722"
                  : method.type == "Activity"
                  ? "#8BC34A"
                  : method.type == "Other"
                  ? "grey"
                  : "",
              marginLeft: "20px",
              marginRight: "10px",
              transform: "scale(1.5)",
            }}
          />
        )}
        <p className="hidden-method-name">{method.name}</p>
        <div style={{ flex: "1", display: "flex", justifyContent: "right" }}>
          <div {...provided.dragHandleProps}>
            <FontAwesomeIcon
              icon={faGripLinesVertical}
              color="white"
              style={{ transform: "scale(3)", marginRight: "30px" }}
            />
          </div>
        </div>
      </div>
    );
  return (
    <div
      style={{
        border: "1px solid #00dfc4",
        borderRadius: "10px",
        margin: "20px",
        backgroundColor: "rgba(255, 255, 255, .05)",
        marginTop: "10px",
      }}
    >
      <div style={{ display: "flex" }}>
        <button
          className="remove-method"
          onClick={(e) => onRemoveMethod(e, index)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <div className="method-name">
          <FontAwesomeIcon
            icon={faPen}
            color="white"
            className="method-name-icon"
          />
          <input
            id="name"
            required="required"
            value={method.name}
            onChange={(e) => handleChange(index, e.target.id, e.target.value)}
            maxLength={80}
          />
        </div>
        <SelectInput
          onChange={(e) => handleChange(index, e.target.id, e.target.value)}
          options={["Discussion", "Game", "Activity", "Other"]}
          id={"type"}
          icon={faCircle}
          iconColor={
            method.type == "Game"
              ? "#2196F3"
              : method.type == "Discussion"
              ? "#FF5722"
              : method.type == "Activity"
              ? "#8BC34A"
              : method.type == "Other"
              ? "grey"
              : "white"
          }
          optionColor={optionColor}
          title={"type"}
          value={method.type}
          marginTop={20}
          marginRight={0}
        />
        <Input
          id="time"
          val={method.time}
          onChange={(e) =>
            handleChangeNumber(index, e.target.id, e.target.value)
          }
          size={"small"}
          inline={true}
          length={2}
          inMargin={36}
          inPadding={14}
          marginRight={0}
          marginTop={20}
        >
          <FontAwesomeIcon icon={faClock} />
        </Input>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "466px 232px" }}>
        <Input
          id="description"
          val={method.description}
          onChange={(e) => handleChange(index, e.target.id, e.target.value)}
          icon={faBookOpen}
          length={1000}
          size={"big"}
          width={394}
          height={150}
        >
          Description
        </Input>
        <div className="equipment-box">
          <span
            className={`equipment-box-title ${
              method.equipment.length && "equipment-box-title-fill"
            }`}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} /> Equipment
          </span>
          {!method.equipment.length && (
            <FontAwesomeIcon
              icon={faQuestion}
              className="equipment-box-required"
            />
          )}

          <div className="equipment-box-items">
            {method.equipment.map((item, itemIndex) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div key={itemIndex} className="equipment-box-item-wrapper">
                    <p className="equipment-box-item-index">{itemIndex + 1}:</p>
                    <input
                      required="required"
                      className="equipment-box-item"
                      value={item}
                      onChange={(event) => {
                        handleEquipmentChange(
                          event.target.value,
                          itemIndex,
                          index
                        );
                      }}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeEquipment(index, itemIndex);
                    }}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      display: "inline-block",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="equipment-box-remove-item"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            className="equipment-box-add-button"
            onClick={(event) => {
              event.preventDefault();
              addEquipment(index);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Equipment
          </button>
        </div>
      </div>
      <Input
        id="notes"
        val={method.notes}
        onChange={(e) => handleChange(index, e.target.id, e.target.value)}
        icon={faComment}
        length={1000}
        size={"big"}
        inline={true}
        width={628}
        height={100}
        required={false}
      >
        Notes
      </Input>
    </div>
  );
};
Method.defaultProps = {
  hidden: false,
};

export default Method;
