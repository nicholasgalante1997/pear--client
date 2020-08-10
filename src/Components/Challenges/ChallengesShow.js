import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Challenge extends Component {
    state = {  }

    addChallenge = () => {
        fetch('http://localhost:3001/api/v1/my_challenges', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                challenge_id: this.props.challenge.id,
                completed: false
            })
        })
        .then(r => r.json())
        .then(mc => console.log(mc))
    }

    render() { 
        return ( 
           <Col md={3}>
               <Card>
                <Card.Title>{this.props.challenge.title}</Card.Title>
                <Card.Body>
                <strong>{this.props.challenge.synopsis}</strong>
                <strong>Contributor: {this.props.challenge.contributor}</strong>
                <br></br>
                <a href={this.props.challenge.git_link}>Github Link</a>
                <br></br>
                <small>Difficulty: {this.props.challenge.difficulty}</small>
                <button onClick={this.addChallenge}>Add To My Challenges</button>
                </Card.Body>
                </Card>
            </Col>
         );
    }
}
 
export default Challenge;