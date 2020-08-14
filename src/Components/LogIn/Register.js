import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'

class RegisterForm extends Component {
    state = {  
        username: "",
        password: "",
        passwordConfirmation: "",
        bio: "",
        img_url: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // this.props.handleSubmit(this.state)
        if (this.state.password === this.state.passwordConfirmation) {
            fetch('http://localhost:3001/api/v1/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(r => r.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                    this.props.setUser(response)
                    this.props.addUser(response.user)
                }
            })
        } else {
            alert("These Passwords Don't Match")
        }
    }

    handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

    render() { 
        console.log(this.state)
        return (
            <Card>
                <Card.Title>New Guy? Register here, guy.</Card.Title>
            <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input name='username' type='text' value={this.state.username} onChange={this.handleChange} placeholder="Username"/><br></br>
                <label>Password:</label>
                <input name='password' type='password' value={this.state.password} onChange={this.handleChange} placeholder="Password"/><br></br>
                <input name='passwordConfirmation' type='password' value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Password Confirmation"/><br></br>
                {/* <label>Tell Us About Yourself!</label>
                <input name='bio' type='text' value={this.state.bio} onChange={this.handleChange} placeholder="Bio..."/><br></br>
                <label>Avatar</label>
                <input name='img_url' type='text' value={this.state.img_url} onChange={this.handleChange} placeholder="Avatar Link"/><br></br> */}
                <button type='submit' className='myButton'>Submit</button>
            </form>
            </Card>
            
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch(action.addUser(user))
    }
}
 
export default connect(null, mapDispatchToProps)(RegisterForm);