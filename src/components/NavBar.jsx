// components/Navbar/index.js
/*eslint-disable */
import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ userName }) => {
    return (
        <>
            <Nav>

                <NavMenu>
                    <h1 style={{ color: "white", fontSize: "30px", marginLeft: "20px", fontFamily: "Arial" }}
                    >Welcome,</h1>
                    <h1 style={{ color: "white", fontSize: "30px", fontFamily: "Arial" }}
                    >{userName}</h1>

                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>



                <NavBtn>
                    <NavBtnLink to={`/newdocs/${userName}`} style={{ marginRight: `25px` }} >
                        Create New Document
                    </NavBtnLink>
                    <NavBtnLink to="/">
                        Log out
                    </NavBtnLink>
                </NavBtn>
            </Nav >
        </>
    );
};

export default Navbar;
