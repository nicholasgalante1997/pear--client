import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'
import Row from 'react-bootstrap/Row'

class MyChallengeShow extends React.Component {

    state = {

    }

    handleCompletedChallenge = () => {
        fetch(`http://localhost:3001/api/v1/my_challenges/${this.props.myChallenge.id}`, {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                completed: !this.props.myChallenge.completed
            })
        })
        .then(r => r.json())
        .then(my_challenge => this.props.updateMyChallenge(my_challenge))
    }

    render () {
    return (
        // <div className='my-challenge'>
        <Row>
        <p>{this.props.myChallenge.challenge.title}:</p>
        {this.props.myChallenge.completed ? <p>Completed: ✅ </p> : <button onClick={this.handleCompletedChallenge}>Done ? 🥺 👉👈</button>}
        {this.props.myChallenge.notes.map(note => 
        <>
        <p>Notes:</p>
        <small>{note.text}</small>
        </>)}
        </Row>
        // {/* // </div> */}
    )}
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateMyChallenge: (my_challenge) => dispatch(action.updateMyChallenge(my_challenge))
    }
}

export default connect(null, mapDispatchToProps)(MyChallengeShow);