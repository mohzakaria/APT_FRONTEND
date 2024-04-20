/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

let loginusername = "";

function Login() {
    const [name, setName] = useState("");

    const createNewDocumentHandler = async (documentName,e) => {
        e.preventDefault();
        fetch("http://localhost:8080/document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "no-cors",
            },
            body: JSON.stringify({
                content: "",
                title: "jiko",
                ownerUsername: "ziko el goat"
            }),
        }).then((response) => {
            if (response.ok) {
                console.log("Document created successfully");
                window.location.href = "/docs";
            } else {
                console.log("Error creating document");
            }
        })
    }

    return (
        <div className="containersbody">
            <div className="container" style={{ marginTop: 200 }}>
                <h1>Document Creation</h1>
                <form >
                    <input
                        name="Document Name"
                        placeholder="DocumentName"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: `10px` }}
                    />
                    <button className="mainbutton" type="button" onClick={(e) => {
                            createNewDocumentHandler(name,e)
                        }}>
                        Create Document
                    </button>ocument

                    <br />
                </form>
            </div>
        </div>
    );
}
export { loginusername };
export default Login;