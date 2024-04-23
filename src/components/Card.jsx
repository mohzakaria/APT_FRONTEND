/*eslint-disable */
import React from 'react';
import profilePic from './docss.png';
import { Link } from 'react-router-dom'; // import Link from react-router-dom


function Card({text, title,id}) {
    console.log(id); // log the id
    
    return(
       <Link className="card" to={`/docs/${id}`}>
            <div style={{ display: "flex-row"

            }}>
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-text">{text}</p>
       </Link> 
    );
}
export default Card