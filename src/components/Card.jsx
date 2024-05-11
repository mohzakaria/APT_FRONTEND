/*eslint-disable */
import React from 'react';
import profilePic from './docss.png';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom


function Card({text, title,id,type}) {
    console.log(id); // log the id
    const navigate = useNavigate(); // useNavigate
    
    const handleClick = () => {
        localStorage.setItem('type', type);
        navigate("/docs/"+id); // navigate to /document/:id
    }
    
    return(
       <div className="card" onClick={handleClick} >
            <div style={{ display: "flex-row"

            }}>
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-text">{text}</p>
       </div> 
    );
}
export default Card