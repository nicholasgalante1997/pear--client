import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const NavBar = (props) => {
    return ( 
        <Container fluid>
            <Navbar className='nav-bar'>

            <Navbar.Brand><strong className='nav-item'>pearProgramming 🍐</strong></Navbar.Brand>
            <NavLink to='/about' className='nav-item'>About</NavLink>
            <NavLink to='/forum' className='nav-item'>Forum</NavLink>
            <NavLink to='/challenges' className='nav-item'>Challenges Page</NavLink>
            {/* Ternary required below for oscillating log in log out */}
            {props.currentUser ? <NavLink to='/users' className='nav-item'>Users Page</NavLink> : null }
            {props.currentUser ? <NavLink to='/profile' className='nav-item'>My Page</NavLink> : null }
            {props.currentUser ? <Nav.Item className='nav-item'> Hey {props.currentUser.username}</Nav.Item> : <NavLink to='/login' className='nav-item'>Log In / Sign Up</NavLink> }
            {props.currentUser ? <button onClick={props.logout}>LogOut</button> : null }

         </Navbar>
        </Container>
        
     );
}
 
export default NavBar;