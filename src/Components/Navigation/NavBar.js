import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const NavBar = (props) => {
    return ( 
        <Container fluid>
            <Navbar className='nav-bar'>

            <Navbar.Brand><strong className='nav-item'>Pear 🍐</strong></Navbar.Brand>
            <NavLink to='/forum' className='nav-item'>Forum</NavLink>
            {/* Ternary required below for oscillating log in log out */}
            <NavLink to='/login' className='nav-item'>Log In / Log Out</NavLink> 
            <NavLink to='/profile' className='nav-item'>My Page</NavLink>
            <NavLink to='/challenges' className='nav-item'>Challenges Page</NavLink>

         </Navbar>
        </Container>
        
     );
}
 
export default NavBar;