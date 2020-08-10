import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Challenge from './ChallengesShow'
import Row from 'react-bootstrap/Row'

class ChallengesContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <Container fluid>
                <h2>Select A Challenge!</h2>
                <Row>
                {this.props.challenges.map(challenge => 
                    <Challenge challenge={challenge} currentUser={this.props.currentUser}/>
                )}
                </Row>
               
            </Container>
         );
    }
}
 
export default ChallengesContainer;