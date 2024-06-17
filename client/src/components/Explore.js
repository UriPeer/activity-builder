import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Activity from "./Activity";

const Explore = ({ headerRef }) => {
  const [activities, setActivities] = useState([]);
  const [horizontalActivities, setHorizontalActivities] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  window.addEventListener("resize", () => {
    setHorizontalActivities(Math.floor(window.innerWidth / 334));
    setHeaderHeight(headerRef.current.offsetHeight);
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/activities`)
      .then((response) => response.json())
      .then((data) => setActivities(data));

    setHorizontalActivities(Math.floor(window.innerWidth / 334));
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  if (activities.error) {
    return (
      <div className="wrapper-cards">
        <h1 style={{ marginTop: headerHeight }}>No activities found</h1>
      </div>
    );
  }

  const numRows =
    horizontalActivities > 0
      ? Math.ceil(activities.length / horizontalActivities)
      : 0;

  return (
    <div
      className="wrapper-cards"
      style={{
        marginTop: headerHeight,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      {Array.from(Array(numRows).keys()).map((lineNum) => (
        <div
          key={lineNum}
          style={{
            display: "flex",
            justifyContent: "left",
            width: `${330 * horizontalActivities}px`,
          }}
        >
          {activities
            .slice(
              lineNum * horizontalActivities,
              lineNum * horizontalActivities + horizontalActivities
            )
            .map((activity) => (
              <Activity activity={activity} key={activity.id} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Explore;
