/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState({id: '', userName: '', role: '' });
    const [submit, setsubmit] = useState("");
    const isMounted = useRef(false);

    useEffect(() => {
      localStorage.setItem('username', "");
      localStorage.setItem('userId', "");
      localStorage.setItem('type', "");
    }, []);
    
    useEffect(() => {
        
        async function logMovies() {
          try {
            const response = await fetch("http://localhost:8080/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username, password: password }),
            });
      
            const isValidUser = await response.json();

            if (
              !response.ok||
              isValidUser === null
            ) {
              throw new Error("Invalid user");
            } else { 
              localStorage.setItem('username', username);
              localStorage.setItem('userId', isValidUser.id);
              navigate("home");
            }
      
          } catch (error) {
            console.error("Error fetching user data:", error);
            setWarning("WRONG PASSWORD OR EMAIL");
          }
        }
      
        if (isMounted.current) {
        logMovies();
        }else
        {
            isMounted.current = true;
        }
      }, [submit]);

      useEffect(() => {
        if (isMounted.current) {
        if (user.role === "Fan") {
          loginusername = user.userName;
          navigate(`home`);
          } else if (user.role === "Manager") {
            navigate("home");
          }}else
          {
            isMounted.current = true;
          }

    if (!username || !password) {
      setWarning("Please fill in all fields");
      return;
    }
    const response = await fetch(`http://localhost:8085/userlogin/${username}/${password}`);

    function CheckType() {
    
        if (username.trim() === "" || password.trim() === "") {
            setWarning("Please enter both username and password.");
            return; // Don't proceed with login if the form is empty
        }
        setsubmit("s");  
        if (submit === "s"){
            setsubmit("");
        }
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