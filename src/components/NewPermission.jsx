/*eslint-disable */
import { colors } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

let loginusername = "";

function NewPermission() {
    const [name, setName] = useState("");
    const { id } = useParams();
    async function deletePermission(id, username) {
        try {
            const response = await fetch(`http://98.66.168.16/document/${id}/permissions/${username}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // or response.json() if the server sends JSON
                throw new Error(errorMessage);
            } else {
                // Do something with the response
                alert("Permission deleted successfully")
            }
        } catch (error) {
            alert(error.message);
        }
    }
    async function addEditorToDocument(id, username) {
        try {
            const response = await fetch(`http://98.66.168.16/document/${id}/editor/${username}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // or response.json() if the server sends JSON
                throw new Error(errorMessage);
            } else {
                // Do something with the response
                alert("Editor added successfully")
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function addViewerToDocument(id, username) {
        try {
            const response = await fetch(`http://98.66.168.16/document/${id}/viewer/${username}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // or response.json() if the server sends JSON
                throw new Error(errorMessage);
            } else {
                // Do something with the response
                alert("Viewer added successfully")
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const permissionType = document.querySelector('input[name="permissiontype"]:checked').value;

        if (permissionType === 'Editor') {
            await addEditorToDocument(id, name);
        } else if (permissionType === 'Viewer') {
            await addViewerToDocument(id, name);
        }
    }
    return (
        <div className="containersbody">
            <div className="container" style={{ marginTop: 200 }}>
                <h1>Document Permissions</h1>
                <form onSubmit={handleSubmit}>
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
                    <button className="mainbutton" type="submit" >
                        Create Permission
                    </button>
                    <button className="deletebutton" type="button" onClick={() => deletePermission(id, name)}>
                        Delete Permission
                    </button>

                    <br />
                </form>
            </div>
        </div>
    );
}

export default NewPermission;