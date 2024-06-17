import Input from "./Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "./SelectInput";

const Signup = (onSignup) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("050");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (phone.length != 10) {
      alert("Phone number has to be 7 digits long!");
      return;
    }
    const response = await fetch(`http://127.0.0.1:5000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      window.alert(data.error);
    }
  };

  return (
    <form className="log-card" onSubmit={onSubmit}>
      <p>Sign Up</p>
      <Input
        val={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        length={80}
      >
        FIRST NAME
      </Input>
      <Input
        val={lastName}
        onChange={(e) => setLastName(e.target.value)}
        length={80}
      >
        LAST NAME
      </Input>
      <Input
        val={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={faEnvelope}
        length={80}
      >
        EMAIL
      </Input>
      <div style={{ display: "flex" }}>
        <SelectInput
          options={["050", "051", "052", "054", "055"]}
          onChange={(e) =>
            setPhone(
              (prev) => e.target.value.substring(0, 3) + prev.substring(3)
            )
          }
          value={phone.substring(0, 3)}
          title={""}
          icon={faPhone}
          iconColor={
            phone.substring(0, 3) == "050"
              ? "white"
              : phone.substring(0, 3) == "051"
              ? "#FFC1CC"
              : phone.substring(0, 3) == "052"
              ? "#FFA07A"
              : phone.substring(0, 3) == "054"
              ? "#FF8C00"
              : phone.substring(0, 3) == "055"
              ? "#FF6347"
              : ""
          }
          optionColor={(option) => {
            return option == "050"
              ? "white"
              : option == "051"
              ? "#FFC1CC"
              : option == "052"
              ? "#FFA07A"
              : option == "054"
              ? "#FF8C00"
              : option == "055"
              ? "#FF6347"
              : "";
          }}
          width={"80px"}
          marginRight={"0"}
          backgroundColor={"transparent"}
        ></SelectInput>
        <Input
          val={phone.substring(3)}
          onChange={(e) => {
            setPhone(
              (prev) => prev.substring(0, 3) + e.target.value.replace(/\D/g, "")
            );
            console.log(phone.substring(0, 3));
          }}
          icon={faPhone}
          length={7}
          width={200}
        >
          PHONE
        </Input>
      </div>
      <Input
        type="password"
        val={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={faLock}
      >
        PASSWORD
      </Input>
      <div className="accept-agreement">
        <p>
          I accept the <Link to="/agreement">user agreement</Link>
        </p>
        <input
          type="checkbox"
          value={accept}
          onChange={(e) => setAccept(e.target.value)}
          required
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default Signup;
