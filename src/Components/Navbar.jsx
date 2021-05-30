import React from 'react'
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";

import logo from '../assets/parking.svg';

const NavbarBrandIcon = styled.img`
    width: 30px; 
    height 30px; 
    margin: 0px 10px 0px 10px;
`

function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" href="#">
                        <NavbarBrandIcon src={logo} className="d-inline-block align-text-top" alt="brandicon" />
                        <span className="fw-bold">EvenPark</span>
                    </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="navbar-nav list-inline">
                            <li className={`nav-item ${props.location.pathname === "/" ? "active" : ""}`}>
                            <Link className="nav-link" to="/">
                                <span>Home</span>
                            </Link>
                            </li>
                            <li className={`nav-item ${props.location.pathname === "/Map" ? "active" : ""}`}>
                            <Link className="nav-link" to="/Map">
                                <span>Map</span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default withRouter(Navbar);