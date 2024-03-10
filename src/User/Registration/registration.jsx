import { useState } from "react";
import "./registration.style.css";

const defoult = {
  name: "",
  password: "",
};

export function Registrate({ setStatusRegistr }) {
  const [input, setInput] = useState(defoult);

  function onSave() {
    let users = [];
    const usersData = localStorage.getItem("users");
    users = usersData ? JSON.parse(usersData) : [];

    if (input.name !== "" && input.password !== "") {
      users.push(input);
      localStorage.setItem("users", JSON.stringify(users));

      setInput(defoult);
      setStatusRegistr(false);
    } else {
      alert("Please field all inputs");
    }
  }

  return (
    <div className="Registrate">
      <div className="RegistrateHeader">
        <h1 className="RegistrateText">Registration</h1>
        <div className="RegistrateContainer">
          <input
            type="text"
            placeholder="User name"
            className="inputRegistr"
            onChange={(name) => {
              setInput((prev) => ({ ...prev, name: name.target.value }));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputRegistr"
            onChange={(password) => {
              setInput((prev) => ({
                ...prev,
                password: password.target.value,
              }));
            }}
          />
          <button className="btnRegistr" onClick={onSave}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
