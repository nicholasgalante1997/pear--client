import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import LogInForm from './LogIn'
import RegisterForm from './Register'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class AuthContainer extends Component {
    state = { 
        register: false 
     }

    toggleRegister = () => {
        this.setState(prevState => {
            return {
                register: !prevState.register
            }
        })
    }
    render() { 
        return ( 
            <Container className='log-in'>
            <Row>
                <Col>
                    {this.state.register ? <RegisterForm {...this.props}/> : 
                    <LogInForm {...this.props}/>}
                    { this.state.register ? <button onClick={this.toggleRegister}>Click for Login</button> : 
                    <button onClick={this.toggleRegister}>Click For Register</button>}
                </Col>
            </Row>
        </Container>
         );
    }
}
 
export default AuthContainer;