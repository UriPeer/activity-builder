import "./App.css";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Create from "./components/Create";
import Update from "./components/Update";
import ActivityDetails from "./components/ActivityDetails";
import UpdateUser from "./components/UpdateUser";
import Admin from "./components/Admin";
import Protected from "./components/Protected";
import AdminProtect from "./components/AdminProtect";
import NewUserProtect from "./components/NewUserProtect";
import Agreement from "./components/Agreement";
import About from "./components/About";
import jwt_decode from "jwt-decode";
import { faL } from "@fortawesome/free-solid-svg-icons";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const fetchRole = (token) => {
    setUserRole(jwt_decode(token).role);
  };
  const fetchUser = (token) => {
    fetch(`http://127.0.0.1:5000/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((responce) => responce.json())
      .then((data) => setUser(data));
  };
  useEffect(() => {
    let temp = localStorage.getItem("access_token");
    if (temp) {
      fetchUser(temp);
      fetchRole(temp);
      setToken(temp);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const headerRef = useRef(null);

  const onLogin = (token) => {
    localStorage.setItem("access_token", token);
    setToken(token);
    setIsAuthenticated(true);
    fetchRole(token);
    fetchUser(token);
    navigate("/home");
  };

  const onOut = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    setToken(null);
  };

  const onUpdate = (newUser) => {
    setUser(newUser);
  };
  return isAuthenticated !== null ? (
    <div>
      <Header
        text={"Uri's Final Project"}
        onOut={onOut}
        headerRef={headerRef}
        role={userRole}
        isAuthenticated={isAuthenticated}
      />

      <Routes>
        <Route path="/about" element={<About headerRef={headerRef} />} />
        <Route
          path="/agreement"
          element={<Agreement headerRef={headerRef} />}
        />
        <Route path="/explore" element={<Explore headerRef={headerRef} />} />
        <Route
          path="/activity/:id"
          element={
            <ActivityDetails
              headerRef={headerRef}
              user={user}
              role={userRole}
              token={token}
            />
          }
        />
        <Route
          path="/"
          element={
            <NewUserProtect isAuthenticated={isAuthenticated}>
              <Welcome />
            </NewUserProtect>
          }
        />
        <Route
          path="/login"
          element={
            <NewUserProtect isAuthenticated={isAuthenticated}>
              <Login onLogin={onLogin} />
            </NewUserProtect>
          }
        />
        <Route
          path="/signup"
          element={
            <NewUserProtect isAuthenticated={isAuthenticated}>
              <Signup />
            </NewUserProtect>
          }
        />
        <Route
          path="/user"
          element={
            <Protected isAuthenticated={isAuthenticated} role={userRole}>
              <UpdateUser loggedUser={user} token={token} onUpdate={onUpdate} />
            </Protected>
          }
        />
        <Route
          path="/home"
          element={
            <Protected isAuthenticated={isAuthenticated} role={userRole}>
              <Home user={user} />
            </Protected>
          }
        />
        <Route
          path="/create"
          element={
            <Protected isAuthenticated={isAuthenticated} role={userRole}>
              <Create headerRef={headerRef} user={user} token={token} />
            </Protected>
          }
        />
        <Route
          path="/update/:id"
          element={
            <Protected isAuthenticated={isAuthenticated} role={userRole}>
              <Update headerRef={headerRef} user={user} token={token} />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtect isAuthenticated={isAuthenticated} role={userRole}>
              <Admin headerRef={headerRef} token={token} />
            </AdminProtect>
          }
        />
        <Route
          path="/user/:id"
          element={
            <AdminProtect isAuthenticated={isAuthenticated} role={userRole}>
              <UpdateUser loggedUser={user} token={token} />
            </AdminProtect>
          }
        />
      </Routes>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
