/*eslint-disable */
import React, { useEffect } from "react";
import Navbar from './NavBar.jsx';
import Card from "./Card.jsx";


export function HomePage() {  

    async function getUserData(){
        const response = await fetch("http:"
        ,{
            header:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "accept": "application/json"
            },
            method: "get",
            mode: "cors"
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const specificuser = await response.json();
        console.log(specificuser);
    
    }
    useEffect(() => {
        getUserData();
    }, []);
    
    const cards = [
        {
            title: 'Top',
            text: 'Tndfsjd',
        },
        {
            title: ' AAAA',
            text: 'OIFDSXd',
        },
        {
            title: 'ZEEEEE',
            text: 'SDAJFSAKJ',
        },
        {
            title: 'LOOOO',
            text: 'ThiPSKD',
        },
        {
            title: 'KOOOO',
            text: 'ThiPSKD',
        },
        {
            title: 'KOOOO',
            text: 'ThiPSKD',
        }
    ];
    return (
        <div>
        <Navbar />{true &&
        <div style={{ backgroundColor:'#dddddd' , 
        display: 'grid' , gap: '20px' , padding: '20px'  , 
         margin: '20px' , borderRadius: '10px' , 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
        }}>
        <h1 style={{color: "black" , fontSize: "24px" , marginLeft: "20px" ,fontFamily: "Arial" }} >
            Owner of:
        </h1> 
        <div style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center'}}>
            {cards.map((card, index) => (
                <Card key={index} title={card.title} text={card.text} />
            ))}
        </div> 
        </div>}
        {true &&
        <div style={{ backgroundColor:'#dddddd' , 
        display: 'grid' , gap: '20px' , padding: '20px'  , 
         margin: '20px' , borderRadius: '10px' , 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2) , 0 6px 20px 0 rgba(0,0,0,0.19)'
        }}>
        <h1 style={{color: "black" , fontSize: "24px" , marginLeft: "20px" ,fontFamily: "Arial" }} >
            Editor of:
        </h1> 
        <div style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent: 'center'}}>
            {cards.map((card, index) => (
                <Card key={index} title={card.title} text={card.text} />
            ))}
        </div> 
        </div>}
        
        </div>
    );
}