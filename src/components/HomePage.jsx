/*eslint-disable */
import Navbar from './NavBar.jsx';
import Card from "./Card.jsx";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";



export function HomePage() {
    let userDocuments = [];
    const { username } = useParams();

    const [ownedDocuments, setOwnedDocuments] = useState(["", ""])
    const [editorDocuments, setEditorDocuments] = useState([])
    const [viewerDocuments, setViewerDocuments] = useState([])


    async function getUserOwnerDocuments() {
        const response = await fetch(`http://localhost:8085/document/owner/${username}`
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
        setOwnedDocuments(userDocuments);

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
        getUserOwnerDocuments()
        getUserEditorDocuments()
        getUserViewerDocuments()
    }, []);


    return (
        <div>
            <Navbar userName={username} />{true &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }} >
                        Owner of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {ownedDocuments.map((document, index) => (
                            <Card key={index} title={document.title} text={document.owner ? document.owner.username : ''} id={document.id} />
                        ))}
                    </div>
                </div>}
            {true &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }} >
                        Editor of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {editorDocuments.map((document, index) => (
                            <Card key={index} title={document.document.title} text={document.document.owner ? document.document.owner.username : ''} id={document.id} />
                        ))}
                    </div>
                </div>}
            {true &&
                <div style={{
                    backgroundColor: '#dddddd',
                    display: 'grid', gap: '20px', padding: '20px',
                    margin: '20px', borderRadius: '10px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
                }}>
                    <h1 style={{ color: "black", fontSize: "24px", marginLeft: "20px", fontFamily: "Arial" }} >
                        Viewer of:
                    </h1>
                    <div style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center' }}>
                        {viewerDocuments.map((document, index) => (
                            <Card key={index} title={document.document.title} text={document.document.owner ? document.document.owner.username : ''} id={document.id} />
                        ))}
                    </div>
                </div>}


        </div>
    );
}