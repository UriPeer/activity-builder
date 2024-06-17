import Input from "./Input";
import { useState } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.access_token);
        setEmail("");
        setPassword("");
      } else {
        window.alert(data.error);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <form className="log-card" onSubmit={onSubmit}>
      <p>Log In</p>
      <Input
        val={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={faEnvelope}
        length={80}
      >
        EMAIL
      </Input>
      <Input
        type="password"
        val={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={faLock}
      >
        PASSWORD
      </Input>
      <input type="submit" />
    </form>
  );
};

export default Login;
