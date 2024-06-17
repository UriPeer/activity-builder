import Input from "./Input";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Method from "./Method";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInput from "./SelectInput";
import {
  faBookOpen,
  faBullseye,
  faChild,
  faLightbulb,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Explore from "./Explore";

const Create = ({ headerRef, activity, update, user, token }) => {
  const [subject, setSubject] = useState(activity.subject);
  const [goal, setGoal] = useState(activity.goal);
  const [description, setDescription] = useState(activity.description);
  const [methods, setMethods] = useState(activity.methods);
  const [audience, setAudience] = useState(activity.audience);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const navigate = useNavigate();

  window.addEventListener("resize", () => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  });

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  const onAddMethod = (e) => {
    e.preventDefault();
    setMethods((prevMethods) => [
      ...prevMethods,
      {
        name: "Method Name",
        description: "",
        notes: "",
        type: "",
        time: "",
        equipment: [],
      },
    ]);
    setSelectedMethod(methods.length);
  };

  const onRemoveMethod = (e, index) => {
    e.preventDefault();
    setMethods(methods.filter((_, i) => i !== index));
    if (selectedMethod == methods.length - 1)
      setSelectedMethod(selectedMethod - 1);
  };

  const removeEquipment = (index, itemIndex) => {
    const newItems = [...methods];
    newItems[index].equipment.splice(itemIndex, 1);
    setMethods(newItems);
  };

  function handleChange(index, name, newValue) {
    const newItems = [...methods];
    newItems[index][name] = newValue;
    setMethods(newItems);
  }
  function handleChangeNumber(index, name, newValue) {
    if (/^\d+$/.test(newValue) || !newValue) {
      const newItems = [...methods];
      newItems[index][name] = newValue;
      setMethods(newItems);
    }
  }
  function addEquipment(index) {
    const newItems = [...methods];
    newItems[index].equipment.push("");
    setMethods(newItems);
  }
  function handleEquipmentChange(value, itemIndex, index) {
    const newItems = [...methods];
    newItems[index].equipment[itemIndex] = value;
    setMethods(newItems);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    for (let i = 0; i < methods.length; i++) {
      let equipmentValidity = true;
      for (let j = 0; j < methods[i].equipment.length; j++)
        if (methods[i].equipment[j] == "") equipmentValidity = false;
      if (
        !methods[i].description ||
        !methods[i].name ||
        !methods[i].time ||
        !methods[i].type ||
        !equipmentValidity
      ) {
        setSelectedMethod(i);
        setTimeout(function () {
          form.reportValidity();
        }, 0);
        return;
      }
    }
    const response = await fetch(
      `http://127.0.0.1:5000/activity${update ? `/${activity.id}` : ""}`,
      {
        method: update ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: subject,
          goal: goal,
          description: description,
          methods: methods,
          audience: audience,
          authorId: user.id,
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      navigate("/explore");
    } else {
      window.alert(data.error);
    }
  };

  return (
    <form
      noValidate
      className="create-card"
      onSubmit={onSubmit}
      style={{
        marginTop: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <div style={{ width: "740px" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <p className="create-card-title">
              {update ? "Update" : "Create"} Activity
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <SelectInput
              options={["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י"]}
              onChange={(e) => setAudience(e.target.value)}
              value={audience}
              title={"Age"}
              icon={faChild}
              iconColor={
                audience == "א"
                  ? "#FFC1CC"
                  : audience == "ב"
                  ? "#FFA07A"
                  : audience == "ג"
                  ? "#FFD700"
                  : audience == "ד"
                  ? "#ADFF2F"
                  : audience == "ה"
                  ? "#00BFFF"
                  : audience == "ו"
                  ? "#7FFFD4"
                  : audience == "ז"
                  ? "#9370DB"
                  : audience == "ח"
                  ? "#BA55D3"
                  : audience == "ט"
                  ? "#FF1493"
                  : audience == "י"
                  ? "#FF69B4"
                  : "white"
              }
              optionColor={(option) => {
                return option == "age"
                  ? "white"
                  : option == "א"
                  ? "#FFC1CC"
                  : option == "ב"
                  ? "#FFA07A"
                  : option == "ג"
                  ? "#FFD700"
                  : option == "ד"
                  ? "#ADFF2F"
                  : option == "ה"
                  ? "#00BFFF"
                  : option == "ו"
                  ? "#7FFFD4"
                  : option == "ז"
                  ? "#9370DB"
                  : option == "ח"
                  ? "#BA55D3"
                  : option == "ט"
                  ? "#FF1493"
                  : option == "י"
                  ? "#FF69B4"
                  : "";
              }}
              width={"80px"}
              marginRight={"20"}
              backgroundColor={"rgba(255, 255, 255, .05)"}
            ></SelectInput>
          </div>
        </div>
        <div className="create-seperator">
          <Input
            val={subject}
            onChange={(e) => setSubject(e.target.value)}
            icon={faLightbulb}
            length={100}
            backgroundColor={"rgba(255, 255, 255, .05)"}
            width={298}
          >
            Subject
          </Input>
          <Input
            val={goal}
            onChange={(e) => setGoal(e.target.value)}
            icon={faBullseye}
            length={100}
            backgroundColor={"rgba(255, 255, 255, .05)"}
            width={298}
          >
            Goal
          </Input>
        </div>
        <div className="create-seperator">
          <Input
            val={description}
            onChange={(e) => setDescription(e.target.value)}
            icon={faBookOpen}
            size={"big"}
            width={668}
            height={200}
            length={1500}
            backgroundColor={"rgba(255, 255, 255, .05)"}
            required={false}
          >
            Description
          </Input>
        </div>
        {methods.map(
          (method, index) =>
            index == selectedMethod && (
              <Method
                method={method}
                key={index}
                handleChange={handleChange}
                handleChangeNumber={handleChangeNumber}
                index={index}
                onRemoveMethod={onRemoveMethod}
                addEquipment={addEquipment}
                handleEquipmentChange={handleEquipmentChange}
                removeEquipment={removeEquipment}
              />
            )
        )}
      </div>
      <div style={{ width: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            const items = Array.from(methods);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            setMethods(items);
            setSelectedMethod(result.destination.index);
          }}
        >
          <Droppable droppableId="methods">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  height: "calc(100% - 140px)",
                  overflowY: "auto",
                  boxSizing: "border-box",
                }}
              >
                {methods.map((method, index) => (
                  <Draggable
                    key={index}
                    draggableId={`method-${index}`}
                    index={index}
                  >
                    {(provided) => {
                      var transform = provided.draggableProps.style.transform;
                      if (transform) {
                        var t = transform.split(",")[1].split(")")[0];
                        provided.draggableProps.style.transform = `translate(-1px, calc(${t} - 40px))`;
                      }
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Method
                            method={method}
                            hidden={true}
                            handleChange={handleChange}
                            onClick={(index) => setSelectedMethod(index)}
                            index={index}
                            onRemoveMethod={onRemoveMethod}
                            selectedMethod={selectedMethod}
                            provided={provided}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div
          style={{
            width: "100%",
            height: "140px",
          }}
        >
          <button className="add-method-button" onClick={onAddMethod}>
            <FontAwesomeIcon icon={faPlus} /> Add Method
          </button>
          <input type="submit" value={"Save Activity"} />
        </div>
      </div>
    </form>
  );
};

Create.defaultProps = {
  activity: {
    subject: "",
    goal: "",
    description: "",
    methods: [
      {
        name: "Method Name",
        description: "",
        notes: "",
        type: "",
        time: "",
        equipment: [],
      },
    ],
    audience: "",
  },
  update: false,
};

export default Create;
