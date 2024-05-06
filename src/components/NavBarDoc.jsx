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

const NavBarDoc = ({ docName, id }) => {
    return (
        <>
            <Nav>

                <NavMenu>
                    <h1 style={{ color: "white", fontSize: "30px", marginLeft: "20px", fontFamily: "Arial" }}
                    >{docName}</h1>
                </NavMenu>
                <NavBtn>

                    <NavBtnLink to={`/newPermission/${id}`}>
                        Add Permission
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default NavBarDoc;
