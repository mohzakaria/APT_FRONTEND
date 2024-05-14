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

    useEffect(() => {
        localStorage.setItem('username', "");
        localStorage.setItem('userId', "");
        localStorage.setItem('type', "");

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let updatedFormData = { ...formData, [name]: value };

        if (name == "confrimPassword") {
            setConfirmPassword(value);
        }

        setFormData(updatedFormData);
    };



    const handleRegister = async () => {


        if (formData.password !== confrimPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8085/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful :) ");
                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', data.id)
                navigate("home");
            }
            else {
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
                <form onSubmit={() => {
                    handleRegister();
                    navigate("home");
                }}>
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