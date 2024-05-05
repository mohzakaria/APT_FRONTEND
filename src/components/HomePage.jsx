/*eslint-disable */
import React, { useEffect, useState } from "react";
import Navbar from './NavBar.jsx';
import Card from "./Card.jsx";


export function HomePage() {
    let userDocuments = [];
    const [documents, setDocuments] = useState(["", ""])


    async function getUserDocuments() {
        const response = await fetch("http://localhost:8080/document"
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
        setDocuments(userDocuments);

    }
    useEffect(() => {
         getUserDocuments()
        

    }, []);


    return (
        <div>
            <Navbar />{true &&
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
                        {documents.map((document, index) => (
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
                        {documents.map((document, index) => (
                            <Card key={index} title={document.title} text={document.owner ? document.owner.username : ''} id={document.id}  />
                        ))}
                    </div>
                </div>}

        </div>
    );
}