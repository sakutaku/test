import React from 'react';
import logo from "../../assets/images/Logo.png";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div className="header-btns">
                    <NavLink to={'/categories'} className="btn btn-category">Categories</NavLink>
                    <NavLink to={'/add-transaction'} className="btn btn-add">Add Transaction</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;