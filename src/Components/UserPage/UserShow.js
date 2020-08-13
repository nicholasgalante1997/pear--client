import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'
import MyChallengeShow from './MyChallengeShow'
import EditUserForm from './EditUserForm'

class UserShow extends Component {
    state = { 
        user: {},
        note: "",
        my_challenge_id: 0,
        showEditForm: false 
     }

     toggleEditFormForUser = () => {
         this.setState(prevState => {
             return {
                 showEditForm: !prevState.showEditForm
             }
         })
     }

     componentDidMount(){

        if (this.props.currentUser) {
        this.fetchUpdatedMyChallenges()
        this.filterForMyChallenges()
        this.fetchNotes()
        } else {
            alert('loading')
        }
     }
    
    fetchNotes = () => {
        fetch('http://localhost:3001/api/v1/notes')
        .then(r => r.json())
        .then(notes => this.props.setNotes(notes))
    }

     handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

     filterForMyPosts = () => {
         let list = [...this.props.posts].filter(post => post.user_id === this.props.currentUser.id)
         return list
     }

     filterForMyChallenges = () => {
         let list = [...this.props.my_challenges].filter(myChallenge => myChallenge.user_id === this.props.currentUser.id)
         return list
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
            {this.props.currentUser ? 
            <h2>Welcome {this.props.currentUser.username}</h2> : 
            <strong>loading</strong> }
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <Card>
                        <Card.Header>MyChallenges</Card.Header>
                        {this.filterForMyChallenges().map(myChallenge => 
                        <Card.Body>
                        <MyChallengeShow myChallenge={myChallenge} currentUser={this.props.currentUser} key={myChallenge.id}/>
                            
                        <Card.Footer>
                        <label>Add A Note</label>
                        <form onSubmit={this.onSubmit} >
                            <input name='note' value={this.state.note} type='text' onChange={this.handleChange}/>
                            <input name='my_challenge_id' value={myChallenge.id} type='hidden'/>
                            <button type='submit'>Submit blah</button>
                        </form>
                        </Card.Footer>
                        </Card.Body>
                        )}
                        </Card>
                    </Col>
                    <Col md={4}>
                        <h2>Posts:</h2>
                        {this.filterForMyPosts().map(post => 
                        <div className='post-user' key={post.id}>
                        <p>{post.topic}</p>
                        <small>{post.text_content}</small>
                        </div>)}
                    </Col>
                    <Col md={4}>
                        { this.props.currentUser ? 
                        <Card>
                            <Card.Img src={this.props.currentUser.img_url} alt=""/>
                        <Card.Header>My Info</Card.Header>
                        <Card.Body>
                        <small>Username: {this.props.currentUser.username}</small>
                        <br></br>
                        <small>Bio: {this.props.currentUser.bio}</small>
                        <br></br>
                        <small>Languages I Like: {this.props.currentUser.programming_preferences}</small>
                        <br></br>
                        </Card.Body>
                        <Card.Footer>
                            <button onClick={this.toggleEditFormForUser}>Edit Info</button>
                            { this.state.showEditForm ? <EditUserForm currentUser={this.props.currentUser}/> : 
                            null }
                        </Card.Footer>
                        </Card> : 
                        <p>loading</p>
                        }   
                    </Col>
                </Row>
            </Container>
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        my_challenges: state.my_challenges
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNotes: notes => dispatch(action.setNotes(notes))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserShow);