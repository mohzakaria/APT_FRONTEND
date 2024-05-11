/*eslint-disable */
import React from 'react';
import profilePic from './docss.png';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import "./styles.css";


function OwnerCard({ text, title, id, type, onAction }) {
    console.log(id); // log the id
    const navigate = useNavigate(); // useNavigate
    let isdelete = false;
    let isRenamed = false;

    const handleClick = () => {
        localStorage.setItem('type', type);
        navigate("/docs/" + id);
    }




    async function deleteDocument() {
        try {
            const response = await fetch(`http://localhost:8080/document/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // or response.json() if the server sends JSON
                throw new Error(errorMessage);
            } else {
                // Do something with the response
                alert("Document deleted successfully")
                isdelete = true;
                const actionInfo = {
                    isdelete
                };
                onAction(actionInfo);
            }
        } catch (error) {
            alert(error.message);
        }
    }


    async function renameDocument(newtitle) {
        try {
            const response = await fetch(`http://localhost:8080/document/${id}/${newtitle}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // or response.json() if the server sends JSON
                throw new Error(errorMessage);
            } else {
                // Do something with the response
                alert("Document renamed successfully")
                isRenamed = true;
                const actionInfo = {
                    isRenamed
                };
                onAction(actionInfo);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="card" onClick={handleClick} >
            <div className='deletediv'><FaTrash
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click event from triggering
                    var r = confirm("Are you sure you want to delete this document ?");
                    if (r) {
                        deleteDocument();
                    }

                }}
                style={{ cursor: "pointer", color: "red" }}
            /></div>
            <div style={{
                display: "flex-row"

            }}>
                <img className="card-image" src={profilePic} alt="profile picture"></img>
            </div>
            <div className='cardtext'>
                <div className='editname'>
                    <h2 className="card-title" id='title'>{title}</h2>

                    <span style={{ cursor: "pointer", marginLeft: "8px" }} onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click event from triggering
                        var r = prompt("Enter document new title", title);
                        if (r != null || r != "") {
                            renameDocument(r);
                        }

                    }}> <FaPencilAlt size={13} /></span>

                </div>
                <div className='nomargin'>
                    <span className="card-text">{text}</span>
                </div>
            </div>



        </div>
    );
}
export default OwnerCard;