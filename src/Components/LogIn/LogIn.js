import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class LogInForm extends Component {
    state = { 
        username: "",
        password: ""
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // this.props.handleSubmit(this.state)
        fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(response => {
            if (response.errors) {
                alert(response.errors)
            } else {
            this.props.setUser(response)
            }
        })
    }

    handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

    render() { 
        console.log(this.state)
        return (
            <Card>
                <Card.Title>Returning Guy? No Problem Guy</Card.Title>
                <form onSubmit={this.handleSubmit}>
                <label>Username:</label>
                <input name='username' type='text' value={this.state.username} onChange={this.handleChange} placeholder="Username"/><br></br>
                <label>Password:</label>
                <input name='password' type='password' value={this.state.password} onChange={this.handleChange} placeholder="Password"/><br></br>
                <button type='submit' className='myButton'>Submit</button>
            </form>
            </Card>
            
         );
    }
}
 
export default LogInForm;