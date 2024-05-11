/*eslint-disable */
import Navbar from './NavBar.jsx';
import Card from "./Card.jsx";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



export function HomePage() {
    let userDocuments = [];
    let userEditDocuments = [];
    let userViewDocuments = [];
    const { username } = useParams();

    const [ownedDocuments, setOwnedDocuments] = useState(["", ""])
    const navigate = useNavigate();
    const [ ownerDocuments, setOwnerDocuments] = useState([])
    const [editorDocuments, setEditorDocuments] = useState([])
    const [viewerDocuments, setViewerDocuments] = useState([])


    async function getUserOwnedDocuments() {
        localStorage.setItem('type', "");
        const userId = localStorage.getItem('userId')
        console.log("USER ID", userId);
        if (!userId) {
            navigate("/")
        }
        const response = await fetch(`http://localhost:8080/document/${userId}/owneddocs`
            , {
                header: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                method: "get",

            });
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);

        }
        userDocuments = await response.json();
        console.log("AYYAYAYAYAYAYAYAYAYAYAYAYAYAYA",userDocuments);
        setOwnerDocuments(userDocuments);

    }
    async function getUserEditedDocuments() {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:8080/document/${userId}/editeddocs`
            , {
                header: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                method: "get",

            });
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);

        }
        userEditDocuments = await response.json();
        console.log("leave emjdsfhdsjf",userEditDocuments);
        setEditorDocuments(userEditDocuments);

    }
    async function getUserViewedDocuments() {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`http://localhost:8080/document/${userId}/vieweddocs`
            , {
                header: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                method: "get",

            });
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);

        }
        userViewDocuments = await response.json();
        console.log(userViewDocuments);
        setViewerDocuments(userViewDocuments);
        console.log("kdsjafkjdsakfjksa",viewerDocuments);

    }
    async function getUserEditorDocuments() {
        const response = await fetch(`http://localhost:8085/document/editor/${username}`
            , {
                header: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                method: "get",

            });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        userDocuments = await response.json();
        console.log(userDocuments);
        setEditorDocuments(userDocuments);

    }
    async function getUserViewerDocuments() {
        const response = await fetch(`http://localhost:8085/document/viewer/${username}`
            , {
                header: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                method: "get",

            });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        userDocuments = await response.json();
        console.log(userDocuments);
        setViewerDocuments(userDocuments);

    }

    useEffect(() => {
        getUserOwnedDocuments()
        getUserEditedDocuments()
        getUserViewedDocuments()

    }, []);



    return (
        <div>
            <Navbar userName={localStorage.getItem('username')} />
            {ownerDocuments && ownerDocuments.length > 0 &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }}>
                        Owner of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {ownerDocuments.map((document, index) => (
                            <Card key={index} title={document.title} text={document.owner.username ? document.owner.username : ''} id={document.id} type="owner"/>
                        ))}
                    </div>
                </div>}
            {editorDocuments && editorDocuments.length > 0 &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }}>
                        Editor of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {editorDocuments.map((document, index) => (
                            <Card key={index} title={document.title} text={document.owner.username ? document.owner.username : ''} id={document.id} type="editor"/>
                        ))}
                    </div>
                </div>}
            {viewerDocuments && viewerDocuments.length > 0 &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }}>
                        Viewer of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {viewerDocuments.map((document, index) => (
                            <Card key={index} title={document.title} text={document.owner.username ? document.owner.username : ''} id={document.id} type="viewer"/>
                        ))}
                    </div>
                </div>}
            {(ownerDocuments.length === 0 && editorDocuments.length === 0 && viewerDocuments.length === 0) &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <h1 style={{fontSize: '24px', fontFamily: 'Arial'}}>No documents found</h1>
                </div>
            }
        </div>
    );
}