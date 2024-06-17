import Input from "./Input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "./SelectInput";

const UpdateUser = ({ loggedUser, token, onUpdate }) => {
  const [user, setUser] = useState({ error: "Loading..." });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("050");
  const [password, setPassword] = useState("");
  const params = useParams();
  let id = params.id ? params.id : loggedUser.id;
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user${params.id ? `/${id}` : ""}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    if (!user.error) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone ? user.phone : "050");
    }
  }, [user]);

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(id);
    if (phone.length != 10) {
      alert("Phone number has to be 7 letters long!");
      return;
    }
    const response = await fetch(`http://127.0.0.1:5000/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      navigate("/home");
      if (id == loggedUser.id) {
        onUpdate(data);
      }
    } else {
      window.alert(data.error);
    }
  };
  if (user.error) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{user.error}</h1>
      </div>
    );
  }

  return (
    <form className="log-card" onSubmit={onSubmit}>
      <p>Update User</p>
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
        required={false}
        question={false}
      >
        PASSWORD
      </Input>
      <input type="submit" />
    </form>
  );
};

export default UpdateUser;
