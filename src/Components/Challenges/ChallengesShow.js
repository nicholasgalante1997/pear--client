import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'

class Challenge extends Component {
    state = {  }

    addChallenge = () => {
        if (this.props.currentUser) {
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
        .then(mc => {
            console.log(mc)
            alert(`${mc.challenge.title} has been added to your challenges.`)
            this.props.addMyChallenge(mc)
        })
    } else {
        alert('dont you think about adding a challenge until you register')
    }}

    render() { 
        return ( 
           <Row className='challenge-show-column'>
               <Col md={2}>
                   <heavy>{this.props.challenge.title}</heavy><br></br>
                   <strong>Contributor: {this.props.challenge.contributor}</strong>
                <br></br>
                </Col>
            <Col>
                <em>{this.props.challenge.synopsis}</em>
            </Col>
            <Col sm={2}>
                <a href={this.props.challenge.git_link}>Github Link</a>
                <br></br>
                <small>Difficulty: {this.props.challenge.difficulty}</small>
                <button onClick={this.addChallenge}>Add To My Challenges</button>
            </Col>
            </Row>
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMyChallenge: (my_challenge) => dispatch(action.addMyChallenge(my_challenge))
    }
}
 
export default connect(null, mapDispatchToProps)(Challenge);