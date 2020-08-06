import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'

const NavBar = (props) => {
    return ( 
        <Navbar className='nav-bar'>
            
            <Navbar.Brand className='nav-logo'>Pear 🍐</Navbar.Brand>
            <NavLink to='/forum'>Forum</NavLink>
            {/* Ternary required below for oscillating log in log out */}
            <NavLink to='/login'>Log In / Log Out</NavLink> 
            <NavLink to='/profile'>My Page</NavLink>
            <NavLink to='/challenges'>Challenges Page</NavLink>

        </Navbar>
     );
}
 
export default NavBar;