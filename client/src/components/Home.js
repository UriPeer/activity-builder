import React from "react";

const Home = ({ user }) => {
  return user !== null ? (
    <div className="wrapper">
      <h1 style={{ padding: "10px" }}>
        Welcome {user.firstName} {user.lastName}
      </h1>
    </div>
  ) : (
    <div></div>
  );
};

export default Home;
