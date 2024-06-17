import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ headerRef, token }) => {
  const [users, setUsers] = useState({ error: "Loading..." });
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();

  window.addEventListener("resize", () => {
    setHeaderHeight(headerRef.current.offsetHeight);
  });

  const getUsers = () =>
    fetch(`http://127.0.0.1:5000/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));

  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => getUsers());
  };

  useEffect(() => {
    getUsers();

    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  if (users.error) {
    return (
      <div className="wrapper-cards">
        <h1 style={{ marginTop: headerHeight }}>{users.error}</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
        overflowY: `scroll`,
      }}
    >
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table
          className="rounded-table admin-page-table"
          style={{ width: "75vw" }}
        >
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email Adress</th>
              <th>Phone Number</th>
              <th>Change User</th>
            </tr>
            {users.map((user, index) => (
              <tr key={index} style={{ height: "2.6em" }}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td
                  style={{
                    width: "100px",
                  }}
                >
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="delete-user-button"
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" />
                  </button>
                  <button
                    onClick={() => navigate(`/user/${user.id}`)}
                    className="update-user-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
