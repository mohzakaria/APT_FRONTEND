/*eslint-disable */
import React from 'react';
import profilePic from './docss.png';

function Card({text, title}) {
    return(
       <a className="card" href='/docs'>
            <div style={{ display: "flex-row"

            }}>
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-text">{text}</p>
       </a> 
    );
}
export default Card