/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { username } = useParams();
    console.log(username);

    const createNewDocumentHandler = async (documentName, e) => {
        e.preventDefault();
        fetch("http://localhost:8085/document", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: documentName,
                content: "",
                owner: {
                    username: username,
                }
            }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    alert("Document created successfully");
                    navigate(`/docs/${data.id}`);
                });
            } else {
                alert("Error creating document");
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
                        createNewDocumentHandler(name, e)
                    }}>
                        Create Document
                    </button>

                    <br />
                </form>
            </div>
        </div>
    );
}
export default Login;