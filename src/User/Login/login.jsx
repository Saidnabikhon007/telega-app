import { useState } from "react";
import "./login.style.css";
import { Registrate } from "../Registration/registration";

export function Login({ setStatusLogin }) {
  const [statusRegistr, setStatusRegistr] = useState(false);
  const [input, setInput] = useState({ name: "", password: "" });

  function onRegistr() {
    setStatusRegistr(true);
  }
  

  function onLogin() {
    const usersDate = localStorage.getItem("users");
    const users = usersDate ? JSON.parse(usersDate) : [];

    if (!users.length) {
      alert(
        `User with name ${input.name} not found. Please at the first registrate!`
      );
      return;
    }
    

    const foundUser = users.find((elem) => elem.name === input.name);
    if (!foundUser) {
      alert(
        `User with name ${input.name} not found. Please at the first registrate!`
      );
      return;
    }

    if (
      input.name === foundUser.name &&
      input.password === foundUser.password
    ) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setStatusLogin(true);
    } else {
      alert("Your name or password is wrong!");
    }
  }

  return statusRegistr ? (
    <Registrate setStatusRegistr={setStatusRegistr} />
  ) : (
    <div className="Login">
      <div className="LoginHeader">
        <h1 className="LoginText">LOG IN</h1>
        <div className="LoginContainer">
          <input
            type="text"
            placeholder="User name"
            className="inputLogin"
            onChange={(name) => {
              setInput((prev) => ({ ...prev, name: name.target.value }));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputLogin"
            onChange={(password) => {
              setInput((prev) => ({
                ...prev,
                password: password.target.value,
              }));
            }}
          />
          <button className="btnLogin" onClick={onLogin}>
            Log In
          </button>
          <p className="linkLogin" onClick={onRegistr}>
            Don`t have an account?
          </p>
        </div>
      </div>
    </div>
  );
}
