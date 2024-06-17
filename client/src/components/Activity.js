import {
  faChild,
  faClock,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Activity = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <div
      className="activity"
      onClick={() => {
        navigate(`/activity/${activity.id}`);
      }}
    >
      <p className="activity-subject">{activity.subject}</p>
      <p className="activity-description">{activity.description}</p>
      <div className="activity-information">
        <p className="activity-author">{activity.author}</p>
        <div className="icontainer">
          <FontAwesomeIcon icon={faClock} style={{ color: "#FFD700" }} />
          <p className="activity-icon-information">{activity.time}</p>
        </div>
        <div className="icontainer">
          <FontAwesomeIcon icon={faChild} style={{ color: "#FF6B6B" }} />
          <p className="activity-icon-information">{activity.audience}</p>
        </div>
        <div className="icontainer">
          <FontAwesomeIcon icon={faPuzzlePiece} style={{ color: "#6C4FBB" }} />
          <p className="activity-icon-information">{activity.methodsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
