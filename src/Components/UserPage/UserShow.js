import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {connect} from 'react-redux'

class UserShow extends Component {
    state = { 
        user: {},
        note: "",
        my_challenge_id: 0
     }

     handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

     filterForMyPosts = () => {
         let list = [...this.props.posts].filter(post => post.user_id === this.props.currentUser.id)
         return list
     }

     filterForMyChallenges = () => {
         let list = [...this.props.allMyChallenges].filter(myChallenge => myChallenge.user_id === this.props.currentUser.id)
         return list
     }

     componentDidMount(){
         this.fetchUpdatedMyChallenges()
         this.filterForMyChallenges()
     }

    fetchUpdatedMyChallenges = () => {
        fetch(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(user => this.setState({user}))
    }

    onSubmit = (event) => {
        event.preventDefault()
        // console.log(event.target.my_challenge_id.value)
        fetch('http://localhost:3001/api/v1/notes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                text: this.state.note,
                my_challenge_id: event.target.my_challenge_id.value
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    render() { 
        // console.log(this.state)
        return ( 
            <>
            <h2>Welcome {this.props.currentUser.username}</h2>
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <h2>MyChallenges</h2>
                        {this.filterForMyChallenges().map(myChallenge => 
                        <div className='my-challenge'>
                        <p>{myChallenge.challenge.title}</p>
                        {myChallenge.completed ? <p>Completed: ✅ </p> : <p>Completed: ❌</p>}
                        {myChallenge.notes.map(note => 
                        <>
                        <p>Notes:</p>
                        <small>{note.text}</small>
                        </>)}
                        <label>Add A Note</label>
                        <form onSubmit={this.onSubmit}>
                            <input name='note' value={this.state.note} type='text' onChange={this.handleChange}/>
                            <input name='my_challenge_id' value={myChallenge.id} type='hidden'/>
                            <button type='submit'>Submit blah</button>
                        </form>
                        </div>)}
                    </Col>
                    <Col md={4}>
                        <h2>Posts:</h2>
                        {this.filterForMyPosts().map(post => 
                        <div className='post-user'>
                        <p>{post.topic}</p>
                        <small>{post.text_content}</small>
                        </div>)}
                    </Col>
                </Row>
            </Container>
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts 
    }
}
 
export default connect(mapStateToProps)(UserShow);