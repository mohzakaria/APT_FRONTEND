/*eslint-disable */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        gender: "",
        city: "",
        address: "",
        role: "",
        status: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'birthDate' ? new Date(value).toISOString() : value;
        let updatedFormData = { ...formData, [name]: formattedValue };

        if (name === 'role') {
            updatedFormData = {
                ...updatedFormData,
                role: value,
                status: value === 'Manager' ? 'pending' : 'approved'
            };
        }

        setFormData(updatedFormData);
    };



    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful :) ");
                console.log("Registration successful :) ");
                if (formData.role === "Manager") {
                    props.onChecked()

                }
                else {
                    navigate(`main/${formData.userName}`)
                }

            } else {
                alert("Registration failed. Please try again :(");


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
                        <input name="userName" placeholder="UserName" required onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="password">Password:</label>
                    <input name="password" placeholder="Password" required minLength="8" onChange={handleInputChange} />
                    </div>
                    <div>
                    <label className="regsettings" htmlFor="password">Confrim Password:</label>
                    <input name="password" placeholder="Confrim Password" required minLength="8" onChange={handleInputChange} />
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