import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
const Footer = () => {
    return (
        <Navbar fixed='bottom' className="footer">
            <small className='footer-left'>pearProgramming 🍐</small>
            <small className='footer-right'>
                <em>Flatiron 2020, Powered with </em> 
                <i class="devicon-react-original-wordmark"></i>
            </small>
        </Navbar>
    )
}

export default Footer;