import { faCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivityDetails = ({ headerRef, user, role, token }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activity, setActivity] = useState({ error: "Loading..." });
  const [selectedMethod, setSelectedMethod] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  window.addEventListener("resize", () => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  });

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    fetch(`http://127.0.0.1:5000/activity/${id}`)
      .then((responce) => responce.json())
      .then((data) => setActivity(data));
  }, []);
  if (activity.error) {
    return (
      <>
        <div
          style={{
            marginTop: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            textAlign: "center",
          }}
        >
          <h1>{activity.error}</h1>
        </div>
      </>
    );
  }
  return (
    <div
      className="activity-display"
      style={{
        marginTop: `${headerHeight + 40}px`,
        height: `calc(100vh - ${headerHeight + 40}px)`,
      }}
    >
      <div
        style={{
          width: `${activity.methods.length != 0 ? "50" : "100"}%`,
          marginRight: "30px",
        }}
      >
        <div className="activity-header">
          <div
            className="activity-field-wrapper"
            style={{
              height: "60px",
              maxWidth: "calc(100% - 100px)",
              minWidth: "110px",
            }}
          >
            <label className="activity-field-title">Author</label>
            <p
              className="activity-field-value"
              style={{
                paddingTop: "20px",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              {activity.author}
            </p>
          </div>
          <div style={{ display: "flex", flex: "1", justifyContent: "right" }}>
            <div
              className="activity-field-wrapper"
              style={{
                width: "100px",
                marginLeft: "20px",
                height: "60px",
              }}
            >
              <label className="activity-field-title">Age</label>
              <p
                className="activity-field-value"
                style={{
                  textAlign: "center",
                  padding: "0",
                  paddingTop: "10px",
                  paddingBottom: "0",
                  marginLeft: "10px",
                  fontSize: "30px",
                }}
              >
                {activity.audience}
              </p>
            </div>
          </div>
          {((user && user.id == activity.authorId) || role == "admin") && (
            <>
              <button
                className="edit-icon"
                onClick={() => navigate(`/update/${activity.id}`)}
              >
                <FontAwesomeIcon icon={faEdit} color="white" />
              </button>
              <button
                className="edit-icon"
                onClick={() =>
                  fetch(`http://127.0.0.1:5000/activity/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(() => navigate(`/explore`))
                }
              >
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            </>
          )}
        </div>
        <div className="activity-info" style={{ height: "654px" }}>
          <div
            className="activity-field-wrapper"
            style={{ marginBottom: "30px", height: "max-content" }}
          >
            <label className="activity-field-title">Subject</label>
            <p className="activity-field-value" style={{ fontSize: "25px" }}>
              {activity.subject}
            </p>
          </div>
          <div
            className="activity-field-wrapper"
            style={{
              height: "max-content",
            }}
          >
            <label className="activity-field-title">Goal</label>
            <p className="activity-field-value">{activity.goal}</p>
          </div>
          <div
            className="activity-field-wrapper"
            style={{
              flexGrow: "1",
              marginTop: "30px",
            }}
          >
            <label className="activity-field-title">Description</label>
            <p className="activity-field-value">{activity.description}</p>
          </div>
        </div>
      </div>
      {activity.methods.length && (
        <div style={{ width: "50%" }}>
          <div
            className="activity-field-wrapper"
            style={{ height: "250px", backgroundColor: "rgb(40, 60, 90)" }}
          >
            <label
              className="activity-field-title"
              style={{ backgroundColor: "rgb(40, 60, 90)" }}
            >
              Methods
            </label>
            <div style={{ margin: "30px 20px 0px 20px" }}>
              {activity.methods.map((method, index) => (
                <div
                  key={index}
                  className={`method-list-item ${
                    selectedMethod == index && "selected-method"
                  }`}
                  onClick={() => {
                    setSelectedMethod(index);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    color={
                      method.type == "Game"
                        ? "#2196F3"
                        : method.type == "Discussion"
                        ? "#FF5722"
                        : method.type == "Activity"
                        ? "#8BC34A"
                        : method.type == "Other"
                        ? "grey"
                        : ""
                    }
                  />
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginLeft: "10px",
                    }}
                  >
                    {method.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="activity-info method-info">
            <table className="method-table">
              <tbody>
                <tr>
                  <td className="method-field-title">Name:</td>
                  <td> {activity.methods[selectedMethod].name}</td>
                </tr>
                <tr>
                  <td className="method-field-title">Type:</td>
                  <td> {activity.methods[selectedMethod].type}</td>
                </tr>
                <tr>
                  <td className="method-field-title">Time:</td>
                  <td> {activity.methods[selectedMethod].time}</td>
                </tr>
                <tr>
                  <td className="method-field-title">Description:</td>
                  <td> {activity.methods[selectedMethod].description}</td>
                </tr>
                {activity.methods[selectedMethod].notes && (
                  <tr>
                    <td className="method-field-title">Notes:</td>
                    <td> {activity.methods[selectedMethod].notes}</td>
                  </tr>
                )}
                {activity.methods[selectedMethod].equipment.length != 0 && (
                  <tr>
                    <td className="method-field-title">Equipment:</td>
                    <td>
                      {" "}
                      {activity.methods[selectedMethod].equipment.map(
                        (item, index) => (
                          <div
                            key={index}
                            style={{
                              display: "inline-block",
                              marginRight: "20px",
                            }}
                          >
                            <p>
                              {item}
                              {index !=
                              activity.methods[selectedMethod].equipment
                                .length -
                                1
                                ? ", "
                                : ""}
                            </p>
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetails;
