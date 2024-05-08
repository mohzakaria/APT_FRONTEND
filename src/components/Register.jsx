/*eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";


function Register(props) {
    const navigate = useNavigate();
    const [confrimPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let updatedFormData = { ...formData, [name]: value };

        if (name == "confrimPassword") {
            setConfirmPassword(value);
        }

        setFormData(updatedFormData);
    };



    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== confrimPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful :) ");
                console.log("Registration successful :) ");
                navigate(`/home/${formData.username}`);

            } else {
                alert("Registration failed. Please try again");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }

    };
    return (
        <div id='DivRegcontainer'>

            <div className="Regcontainer">

                <h1 className="regsettings">Welcome</h1>
                <form onSubmit={handleRegister}>
                    <div>
                        <label className="regsettings" htmlFor="userName">UserName:</label>
                        <input name="username" placeholder="UserName" required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="regsettings" htmlFor="password">Password:</label>
                        <input name="password" placeholder="Password" required minLength="8" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="regsettings" htmlFor="password">Confrim Password:</label>
                        <input name="confrimPassword" placeholder="Confrim Password" required minLength="8" onChange={handleInputChange} />
                    </div>
                    <button className="mainbutton" type="submit" >Register</button>
                    <br />
                    <a className="secondarybutton" id="login" onClick={props.onChecked}>Login</a>
                </form>
            </div>
        </div>
    );
}

export default Register;