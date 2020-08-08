import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

class RegisterForm extends Component {
    state = {  
        username: "",
        password: "",
        bio: "",
        img_url: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // this.props.handleSubmit(this.state)
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
                <label>Tell Us About Yourself!</label>
                <input name='bio' type='text' value={this.state.bio} onChange={this.handleChange} placeholder="Bio..."/><br></br>
                <label>Avatar</label>
                <input name='img_url' type='text' value={this.state.img_url} onChange={this.handleChange} placeholder="Avatar Link"/><br></br>
                <button type='submit' className='myButton'>Submit</button>
            </form>
            </Card>
            
         );
    }
}
 
export default RegisterForm;