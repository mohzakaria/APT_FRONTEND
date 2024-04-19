/*eslint-disable */
import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

let loginusername = "";

function Login(props) {
    const [name, setName] = useState("");
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState({id: '', userName: '', password: '', firstName: '', lastName: '', birthDate: '', gender: '', city: '', address: '', email: '', role: '' });
    const [submit, setsubmit] = useState("");
   
    function CheckType() {
        
        if (name.trim() === "" ) {
            setWarning("Please enter both username and password.");
            return; // Don't proceed with login if the form is empty
        }
        setsubmit("s");
        
        if (submit === "s"){
            setsubmit("");
        }
    }

    return (
        <div className="containersbody">
            <div className="container" style={{marginTop:200}}>
                <h1>Document Creation</h1>
                <form>
                    <input
                        name="Document Name"
                        placeholder="DocumentName"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{marginBottom:`10px`}}
                    />
                  {warning && <p style={{ color: "white" }}>{warning}</p>}
                    <a className="mainbutton" type="button" onClick={CheckType} href="/docs" style={{color:`black`}}>
                        Create Document
                    </a>
                    <br />
                </form>
            </div>
        </div>
    );
}
export {loginusername};
export default Login;