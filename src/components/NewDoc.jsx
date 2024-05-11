/*eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [documentName, setDocumentName] = React.useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // let updatedFormData = { ...formData, documentName: value };

        setDocumentName(e.target.value);
    };

    const createNewDocumentHandler = async (documentName, e) => {
        e.preventDefault();
        console.log("Creating new document");
        console.log(documentName);
        console.log(localStorage.getItem('username'));
        fetch("http://localhost:8080/document", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: documentName,
                content: "",
                owner: {
                    username: localStorage.getItem('username')
                }
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Error creating document");
                throw new Error("Error creating document");
            }
        }).then((data) => {
            console.log("Document created successfully");
            localStorage.setItem('type', 'owner');
            window.location.href = `/docs/${data.id}`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="containersbody">
            <div className="container" style={{ marginTop: 200 }}>
                <h1>Document Creation</h1>
                <form >
                    <input
                        name="DocumentName"
                        placeholder="DocumentName"
                        onChange={handleInputChange}
                        style={{ marginBottom: `10px` }}
                    />
                    <button className="mainbutton" type="button" onClick={(e) => {
                        createNewDocumentHandler(documentName, e)
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