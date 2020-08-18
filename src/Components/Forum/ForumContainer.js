import React, { Component } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DiscussionContainer from './DiscussionContainer'
import {NavLink} from 'react-router-dom'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'

class ForumContainer extends Component {
    state = { 
        posts: [],
        newPostContent: "",
        newPostTopic: "",
        showNewThreadContent: false,
    }

    // CONTAINER THREE METHOD FOR SUGGESTED DAILY CONTENT
    randomizeDailyChallenges = () => {
        let dailyChallenges = []
        for (let i=0; i < 6; i++) {
            const randomNumber = Math.floor(Math.random() * this.props.challenges.length)
            const randomChal = this.props.challenges.find(challenge => challenge.id === randomNumber)
            dailyChallenges.push(this.props.challenges[randomChal])
        }
        return dailyChallenges
    }

    // LANGUAGE PREFERENCE FOR CURRENTUSER
    preferredLanguages = () => {
        let languagePreferences = []
        if (!!this.props.currentUser && !!this.props.currentUser.programming_preferences) {
            languagePreferences = this.props.currentUser.programming_preferences.split(" ")
        }
        return languagePreferences
    }

    // HELPER METHOD FOR SEPARATING CHALLENGES
    preferredChallenges = () => {
        let languageArray = this.preferredLanguages()
        let preferredChallenges = []
        let associatedChallenges = []
        languageArray.forEach(language => {
          associatedChallenges = this.props.challenges.filter(challenge => challenge.topic.toLowerCase().includes(language.toLowerCase()))
        })
       return [...associatedChallenges].slice(0, 3)
    }

    // CHANGES LOCAL STATE TO RENDER FORM FOR SUBMITTING A NEW POST
    toggleNewThreadContent = () => {
        this.setState(prevState => {
            return {
                showNewThreadContent: !prevState.showNewThreadContent
            }
        })
    }

    // FORM METHODS

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.props.currentUser) {
        fetch('http://localhost:3001/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                topic: this.state.newPostTopic,
                text_content: this.state.newPostContent
            })
        })
        .then(r => r.json())
        .then(post => {
            this.setState(prevState => {
                return {
                    newPostContent: "",
                    newPostTopic: "",
                    showNewThreadContent: false,
                }
            })
            this.props.addPost(post)
        })
    }   else {
        alert('Must be signed in to submit a post')
    }
    }

    renderNewThreadForm = () => {
      return (  
        <Card.Footer>
            <form className='new-post-form' onSubmit={this.handleSubmit}>
                <strong>New Discussion Form!</strong><br></br>
                <label>Thread Topic;</label>
                <input name='newPostTopic' placeholder='Thread Topic' value={this.state.newPostTopic} onChange={this.handleChange} type='text'/>
                <label>New Post Content</label>
                <input placeholder='Begin Writing Post' name='newPostContent' value={this.state.newPostContent} onChange={this.handleChange} type='text'/>
                <button type='submit'>Post</button>
                <button onClick={this.toggleNewThreadContent}>Hide Form</button>
            </form>
        </Card.Footer>
      );
    }

    render() { 
        console.log(this.preferredChallenges())
        return ( 
            <div>
                <br></br>
                <h2>Welcome To the Forum!</h2>
                <br></br>

                {/* HOLDS ALL THREE COLUMNS */}
                <Container fluid>
                    <Row>
                        {/* FIRST COLUMN IS THE SIDE NAV FOR THE MOVEMENT TO THE CHALLENGES SHOW PAGES  */}
                        <Col md={3} className='side-bar'>
                        <br></br>
                            <Card>
                                <Card.Title><em>Langs</em></Card.Title>
                                <Card.Body>
                                    <ul>
                                        <li><NavLink to='/challenges/ruby'>Ruby & Rails<i class="devicon-ruby-plain-wordmark colored"></i></NavLink></li>
                                        <li><NavLink to='/challenges/python'>Python <i class="devicon-python-plain-wordmark colored"></i></NavLink></li>
                                        <li><NavLink to='/challenges/nodejs'>Node.Js <i class="devicon-nodejs-plain"></i></NavLink></li>
                                        <li><NavLink to='/challenges/backend'>NSL; Backend Challenges <i class="devicon-postgresql-plain-wordmark colored"></i></NavLink></li>
                                        <li><NavLink to='/challenges/php'>PHP<i class="devicon-php-plain"></i></NavLink></li>
                                        <li><NavLink to='/challenges/java'>Java <i class="devicon-java-plain"></i></NavLink></li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>


                        {/* THIRD COLUMN, CHALLENGE SUGGESTIONS BASED ON CURRENTUSER LANG PREF && SKILL LEVEL */}
                        <Col md={3} className='suggested-challenges'>
                            <Card>
                                <Card.Title><em>Suggested Challenges</em></Card.Title>
                                {this.props.currentUser ? 
                                        <>
                                    {(this.props.currentUser.programming_preferences !== null) ? 
                                    <>
                                        {this.preferredChallenges().map(challenge => 
                                            <>
                                            <strong>{challenge.title}:</strong> 
                                            <a href={challenge.git_link}>Git Link</a>
                                            <em>{challenge.topic}</em>
                                            </>  
                                        )} 
                                        </> :
                                            <p>try adding some langauage preferences on your user page</p> }
                                        </>
                                :<p>Please Sign In and Select a Language to Get Personalized Challenges</p>}
                            </Card>
                        </Col>

                        {/* SECOND COLUMN IS THE POSTS CONTAINER */}
                        <Col className='scrolling-box'>
                            <Card>
                                <Card.Title><em>Main Post Container</em></Card.Title>
                                <Card.Body>
                                <DiscussionContainer  
                                currentUser={this.props.currentUser} 
                                />
                                </Card.Body>
                                <Card.Footer>
                               {this.state.showNewThreadContent ? this.renderNewThreadForm() : <button className='btn' onClick={this.toggleNewThreadContent}>Show New Thread Form</button>}
                               </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br></br><br></br><br></br><br></br><br></br>
            </div>
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: (post) => dispatch(action.addPost(post))
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ForumContainer);


// REMOVED DURING REDUX REFACTOR

{/* <Card.Footer>
    <form className='new-post-form'>
        <input placeholder='Begin Writing Post' name='newPostContent' value={this.state.newPostContent} onChange={this.handleChange} type='text'/>
        <button type='submit'>Post</button>
    </form>
</Card.Footer> */}