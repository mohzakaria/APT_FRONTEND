/*eslint-disable */
import { colors } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

let loginusername = "";

function NewPermission() {
    const [name, setName] = useState("");

    const createNewDocumentHandler = async (documentName, e) => {
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
                <h1>Document Permissions</h1>
                <form >
                    <input
                        name="UserName"
                        placeholder="UserName"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: `10px` }}
                    />
                    <div id="radios">
                        <div >
                            <input id="editor" type="radio" value="Editor" name="permissiontype" />
                            <label for="editor">Editor</label>
                        </div>
                        <div id="radio2">
                            <input id="viewer" type="radio" value="Viewer" name="permissiontype" />
                            <label for="viewer">Viewer</label>
                        </div>
                    </div>
                    <button className="mainbutton" type="button" onClick={(e) => {
                        createNewDocumentHandler(name, e)
                    }}>
                        Create Permission
                    </button>
                    <button className="deletebutton" type="button" >
                        Delete Permission
                    </button>

                    <br />
                </form>
            </div>
        </div>
    );
}

export default NewPermission;