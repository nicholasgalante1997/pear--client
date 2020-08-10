import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Challenge extends Component {
    state = {  }
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
                </Card.Body>
                </Card>
            </Col>
         );
    }
}
 
export default Challenge;