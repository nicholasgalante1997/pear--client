import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'
import Row from 'react-bootstrap/Row'

class MyChallengeShow extends React.Component {

    state = {
        note: ""
    }

    handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

    filterForMyNotes = () => {
        return [...this.props.notes].filter(note => note.my_challenge_id === this.props.myChallenge.id)
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
        console.log(this.props, this.filterForMyNotes())
            return (
            <tr>
            <th>{this.props.myChallenge.id}</th>
            <th><p>{this.props.myChallenge.challenge.title}</p></th>
            <th>{this.props.myChallenge.challenge.topic}</th>
            <th><a href={this.props.myChallenge.challenge.git_link}>Git Link</a></th>
            {this.props.myChallenge.completed ? 
            <th>done </th> : 
            <th><button onClick={this.handleCompletedChallenge}>Done ? 🥺 👉👈</button></th>}
            <th><button onClick={() => this.props.setCurrentMyChallenge(this.props.myChallenge)}>View Notes</button></th>
            </tr>
            )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateMyChallenge: (my_challenge) => dispatch(action.updateMyChallenge(my_challenge)),
        setCurrentMyChallenge: (my_challenge) => dispatch(action.setCurrentMyChallenge(my_challenge))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChallengeShow);

{/* <tr> */}
{/* <th>{myChallenge.challenge.id}</th>
<th><p>{myChallenge.challenge.title}</p></th>
<th>{myChallenge.challenge.topic}</th>
<th><a href={myChallenge.challenge.git_link}>Git Link</a></th>
<th>{myChallenge.challenge.completed}</th>
{myChallenge.challenge.completed ? 
<th>done </th> : 
<th><button onClick={this.handleCompletedChallenge}>Done ? 🥺 👉👈</button></th>}
</tr> */}

// <p>Notes:</p>
// <ul>
// {this.filterForMyNotes().map(note => 
// <li>{note.text}</li>
// )}
// </ul>