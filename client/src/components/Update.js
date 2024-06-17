import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Create from "./Create";

const Update = ({ headerRef, user, token }) => {
  const { id } = useParams();
  const [activity, setActivity] = useState({ error: "Loading..." });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/activity/${id}`)
      .then((responce) => responce.json())
      .then((data) => setActivity(data));
  }, []);
  if (activity.error) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: `${
              headerRef.current ? headerRef.current.offsetHeight : "80"
            }px`,
            left: "50%",
            transform: "translateX(50%)",
          }}
        >
          <h1>{activity.error}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Create
          headerRef={headerRef}
          update={true}
          activity={activity}
          user={user}
          token={token}
        />
      </>
    );
  }
};

export default Update;
