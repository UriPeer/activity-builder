import {
  faHouse,
  faPeopleGroup,
  faPlus,
  faUnlockKeyhole,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ text, onOut, headerRef, isAuthenticated, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
  };

  const navigateMain = () => {
    navigate("/");
  };

  const navigateExplore = () => {
    navigate("/explore");
  };

  const navigateCreate = () => {
    navigate("/create");
  };

  const navigateUser = () => {
    navigate("/user");
  };
  const navigateAdmin = () => {
    navigate("/admin");
  };

  return (
    <header className="header" ref={headerRef}>
      <Link to={"/about"} className="header-text">
        {text}
      </Link>
      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faHouse}
            color="white"
            className={`redirector ${
              location.pathname == "/home" && "redirector-selected"
            }`}
            onClick={navigateHome}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faPeopleGroup}
            color="white"
            className={`redirector ${
              location.pathname == "/explore" && "redirector-selected"
            }`}
            onClick={navigateExplore}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            className={`redirector ${
              location.pathname == "/create" && "redirector-selected"
            }`}
            onClick={navigateCreate}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faUser}
            color="white"
            className={`redirector ${
              location.pathname == "/user" && "redirector-selected"
            }`}
            onClick={navigateUser}
          ></FontAwesomeIcon>
          {role === "admin" && (
            <FontAwesomeIcon
              icon={faUnlockKeyhole}
              color="white"
              className={`redirector ${
                location.pathname == "/admin" && "redirector-selected"
              }`}
              onClick={navigateAdmin}
            ></FontAwesomeIcon>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faHouse}
            color="white"
            className={`redirector ${
              location.pathname == "/" && "redirector-selected"
            }`}
            onClick={navigateMain}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faPeopleGroup}
            color="white"
            className={`redirector ${
              location.pathname == "/explore" && "redirector-selected"
            }`}
            onClick={navigateExplore}
          ></FontAwesomeIcon>
        </div>
      )}
      <div style={{ flex: 1, justifyContent: "right", display: "flex" }}>
        {!isAuthenticated ? (
          <>
            <Link
              className="signup-button"
              to={location.pathname == "/signup" ? "/" : "/signup"}
            >
              Sign Up
            </Link>

            <Link
              className="login-button"
              to={location.pathname == "/login" ? "/" : "/login"}
            >
              Log In
            </Link>
          </>
        ) : (
          <Link className="logout-button" to={"/"} onClick={onOut}>
            Log Out
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
