/*eslint-disable */
import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

let loginusername = "";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState({id: '', userName: '', password: '', firstName: '', lastName: '', birthDate: '', gender: '', city: '', address: '', email: '', role: '' });
    const [submit, setsubmit] = useState("");
    const isMounted = useRef(false);
    useEffect(() => {
        
        async function logMovies() {
          try {
            const response = await fetch("http://localhost:3000/users/" + username + "/" + password, {
              method: "get",
              mode: "cors"
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            const specificuser = await response.json();
            console.log(specificuser);
             setUser(specificuser);
           
      
            // if (specificuser.role === "Fan") {
            //   navigate("main");
            // } else if (specificuser.role === "Manager") {
            //   navigate("manager");
            // }
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
          navigate(`main/${user.userName}`);
          } else if (user.role === "Manager") {
            if(user.status === "pending"){
              alert("Your request is still pending");
            }
            else{
            navigate("manager");
            }
          }}else
          {
            isMounted.current = true;
          }

      },[user]);
      

    function CheckType() {
        
        if (username.trim() === "" || password.trim() === "") {
            setWarning("Please enter both username and password.");
            return; // Don't proceed with login if the form is empty
        }
        setsubmit("s");
        
        if (submit === "s"){
            setsubmit("");
        }
        

        // Assuming username, password, M, and manager are defined somewhere in your code
        if (username === "M" && password === "M") {
           
            // Use navigate to navigate to the manager path
            navigate("authorizeusers");
        }
    }

    return (
        <div className="containersbody">
            <div className="container" style={{marginTop:200}}>
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
                  {warning && <p style={{ color: "white" }}>{warning}</p>}
                    <button className="mainbutton" type="button" onClick={CheckType}>
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
export {loginusername};
export default Login;