import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import LogInForm from './LogIn'
import RegisterForm from './Register'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const AuthContainer = (props) => {
    return ( 
        <Container fluid>
            <Row>
                <Col md={6}>
                    <RegisterForm {...props}/>
                </Col>
                <Col md={6}>
                    <LogInForm {...props}/>
                </Col>
            </Row>
        </Container>
     );
}
 
export default AuthContainer;