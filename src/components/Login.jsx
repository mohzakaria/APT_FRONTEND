/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState({ id: '', username: '' });
  const [submit, setsubmit] = useState("");
  const isMounted = useRef(false);

  async function loginUser(username, password) {

    if (!username || !password) {
      setWarning("Please fill in all fields");
      return;
    }
    const response = await fetch(`http://localhost:8085/userlogin/${username}/${password}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();

    if (!data) {
      setWarning("Invalid username or password");
      return;
    }

    const user = JSON.parse(data);
    console.log(user);

    if (!user || Object.keys(user).length === 0) {
      setWarning("Invalid username or password");
    } else {
      navigate(`/home/${username}`);
    }
  }


  return (
    <div className="containersbody">
      <div className="container" style={{ marginTop: 200 }}>
        <h1>Welcome Back</h1>
        <form>
          <input
            name="username"
            placeholder="UserName"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {warning && <p style={{ color: "white", fontWeight: "bold" }}>{warning}</p>}
          <button className="mainbutton" type="button" onClick={() => loginUser(username, password)}>
            Login
          </button>
          <br />
          <a className="secondarybutton" onClick={props.onChecked}>
            Register
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;