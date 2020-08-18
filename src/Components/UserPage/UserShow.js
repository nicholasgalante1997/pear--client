import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'
import MyChallengeShow from './MyChallengeShow'
import EditUserForm from './EditUserForm'
import Post from '../Forum/Post'
import FriendRequest from './FriendRequestRow'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'

class UserShow extends Component {

    state = { 
        followers: [],
        following: [],
        note: "",
        showEditForm: false 
    }

    // FILTER FOR CURRENT CHALLENGE NOTES
    filterForCurrentChallengeNotes = () => {
        if (this.props.current_my_challenge.id) {
            return [...this.props.notes].filter(note => note.my_challenge_id === this.props.current_my_challenge.id)
        } else {
            return null
        }
    }

    // MOVED OVER FROM USERROWSHOW
     // LifeCycle Methods
     componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.findMyFollowers()
            this.findWhoIFollow()
        }
    }

     // COMPONENT LIFE CYCLE
     componentDidMount(){
        if (this.props.currentUser) {
            this.filterForMyChallenges()
            this.filterForMyPosts()
        } else {
            alert('loading')
        }
        this.setFollows()
    }
    
    // HELPER METHOD FOR FOLLOWER / FOLLOWEE 
    setFollows = () => {
        if (this.props.currentUser) {
        this.findMyFollowers()
        this.findWhoIFollow()
        } 
    }

    // Set Current User Relationships to Local State
    findMyFollowers = () => {
        if (this.props.follows) {
            let followers = [...this.props.follows].filter(follow => follow.followee_id === this.props.currentUser.id)
            this.setState({
                followers: followers
            })
        } else {
            return null 
        }
    }

    findWhoIFollow = () => {
        if (this.props.follows) {
            let following = [...this.props.follows].filter(follow => follow.follower_id === this.props.currentUser.id)
            this.setState({
                following: following
            })
        }
    }

    // CLICK METHODS FOR NAV LINKS ON RELATIONSHIPS 
    handleFollowersCLick = (event) => {
        console.log(event.target)
    }

    // FIND THIS CURRENT USERS POSTS
    filterForMyPosts = () => {
         let list = [...this.props.posts].filter(post => post.user_id === this.props.currentUser.id)
         return list
    }

    // FIND THIS CURRENT USERS CHALLENGES
    filterForMyChallenges = () => {
         let list = [...this.props.my_challenges].filter(myChallenge => myChallenge.user_id === this.props.currentUser.id)
         return list
    }

    // PROGRESS TRACKER 
    progressTracker = () => {
        let completed = [...this.filterForMyChallenges()].filter(myChallenge => myChallenge.completed === true )
        return (completed.length / this.filterForMyChallenges().length)
    }

    progressTrackerEmotions = () => {
        if (this.progressTracker() >= 0 && this.progressTracker() < 0.5){
            return "🙄🤕"
        } else if (this.progressTracker() >= 0.5 && this.progressTracker < 0.75) {
            return "🤠😮👌"
        } else if (this.progressTracker() >= 0.75) {
            return "🔥🥵🧠"
        } else {
            return null 
        }
    }

    // HANDLE ADDING NOTE TO CHALLENGE
    onSubmit = (event) => {
        event.preventDefault()
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
        .then(note => {
            this.props.addNote(note)
            this.setState({note: ""})
        })
    }

    // HANDLE DISPLAYING THE EDIT USER FORM
    toggleEditFormForUser = () => {
        this.setState(prevState => {
            return {
                showEditForm: !prevState.showEditForm
            }
        })
   }

    handleChange = (event) => this.setState({
        [event.target.name]: event.target.value
    })

    render() { 
        console.log(this.props.notes)
        return ( 
            // MAIN CONTAINER 
            <Container fluid>
                <br></br>
                {/* MAIN ROW */}
                <Row>

                    {/* USER SIDEBAR COLUMN */}
                <Col md={3} className='user-sidebar'>

                    {/* WELCOME BAR / USER INFO */}
                    {/* AVATAR */}
                    <Row>
                    <Col md={1}>
                        {this.props.currentUser ? 
                            <Image className='profile-avi' src={this.props.currentUser.img_url} alt=""/> : 
                            <strong>loading</strong> }
                    </Col>
                    {/* GREETING + FOLLOWERS/FOLLOWEES */}
                    <Col md={4} className='welcome-user'>
                    {this.props.currentUser ? 

                    <em>Welcome {this.props.currentUser.username}</em> : 
                    <strong>loading</strong> }
                    </Col>
                    </Row>

                    {/* USER RELATIONS */}
                    <Row>
                    <Nav.Link>Followers: {this.state.followers.length}</Nav.Link> 
                    <Nav.Link>Following: {this.state.following.length}</Nav.Link>
                    </Row>

                    {/* USER INFO */}
                    <Row>
                        {this.props.currentUser ? 
                        <Container>
                            <div className='side-info-container'>
                            <Row>
                                <strong className='bio-side'>Bio; {this.props.currentUser.bio}</strong>
                            </Row>
                            <Row>
                                <strong className='langs-side'>Langs; {this.props.currentUser.programming_preferences}</strong> 
                            </Row>
                            <Row className='side-edit-button'>
                                <button onClick={this.toggleEditFormForUser}>Edit Info</button>
                                { this.state.showEditForm ? <EditUserForm 
                                    currentUser={this.props.currentUser}
                                    updateCurrentUser={this.props.updateCurrentUser}/> : 
                                    null }
                            </Row>

                            </div>
                            {/* PROGRESS TRACKER  */}
                            <Row>
                            <p>Youve completed {this.progressTracker() * 100} % of your challenges so far! {this.progressTrackerEmotions()}</p>
                            </Row>


                            <div className='follow-boxes'>
                            <Row>
                                <ul>
                                <em>Followed By :</em>
                                {this.state.followers.length > 0 ? 
                                <>
                                {this.state.followers.map(follow => 
                                    <li>
                                    <Image className='follow-image' src={follow.follower.img_url}/>
                                    <em>{follow.follower.username}</em>
                                    </li>)} 
                                    </> : 
                                    null 
                                }
                                </ul>
                            </Row>
                            <Row>
                                <ul>
                                <em>Following :</em>
                                {this.state.following.length > 0 ? 
                                <>
                                {this.state.following.map(follow => 
                                    <li>
                                    <Image className='follow-image' src={follow.followee.img_url}/>
                                    <em>{follow.followee.username}</em>
                                    </li>)} 
                                    </> : 
                                    null 
                                }
                                </ul>
                            </Row>
                            </div>
                        </Container> : 
                        <p>loading</p>}
                    </Row>

                </Col>

                {/* post and challenge column */}
                <Col md={6}>
                <Row className="top-row">
                <strong>My Code Challenges</strong>
                <Table striped bordered hover responsive className='my-challenge-table'> 
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Language</th>
                            <th>Git Link</th>
                            <th>Completed</th>
                            <th>Notes:</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.filterForMyChallenges().map(myChallenge => 
                        <MyChallengeShow 
                        myChallenge={myChallenge} 
                        currentUser={this.props.currentUser} 
                        key={myChallenge.id}/>)}
                    </tbody>
                </Table>
                </Row>
                <Row className="bottom-row">
                   <strong>My Posts</strong> 
                   <div className='hold-my-posts-real-quick'>
                   {this.filterForMyPosts().map(post => <Post 
                        post={post} 
                        className='post' 
                        key={post.id} 
                        users={this.props.users} 
                        currentUser={this.props.currentUser}/>
                        )}
                    </div>
                </Row>
                </Col>

                <Col md={3}>
                   <div className='current_note'>
                   { this.props.current_my_challenge.id ? 
                   <div className='note-meat'>
                   <heavy>{this.props.current_my_challenge.challenge.title}</heavy><br></br>
                   <em>{this.props.current_my_challenge.challenge.synopsis}</em><br></br>
                   <small style={{font:'italic'}}>Completed: {this.props.current_my_challenge.completed ? <p>✅</p> : <p>❌</p>}</small><br></br>
                   <label>Notes;</label>
                    <ul>
                    {this.filterForCurrentChallengeNotes().map(note => <li>{note.text}</li>)}
                    </ul>
                    <label>Add A Note</label>
                    <form onSubmit={this.onSubmit} >
                        <input name='note' value={this.state.note} type='text' onChange={this.handleChange}/>
                        <input name='my_challenge_id' value={this.props.current_my_challenge.id} type='hidden'/>
                        <button type='submit'>Submit blah</button>
                    </form>
                   </div> : 
                   <p>Select a Challenge to View Previous Notes or Add A Note</p>}
                   </div>
                </Col>



                </Row>

<br></br>
<br></br>
<br></br>
            </Container>
         );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        my_challenges: state.my_challenges,
        follows: state.follows,
        notes: state.notes,
        current_my_challenge: state.current_my_challenge
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: (note) => dispatch(action.addNote(note))
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(UserShow);

// UNNECESSARY EXTRAS 

    // fetchUpdatedMyChallenges = () => {
    //     fetch(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}`)
    //     .then(r => r.json())
    //     .then(user => this.setState({user}))
    // }
    
    // const mapDispatchToProps = dispatch => {
    //     return {
    //         setNotes: notes => dispatch(action.setNotes(notes))
    //     }
    // }

    // fetchNotes = () => {
    //     fetch('http://localhost:3001/api/v1/notes')
    //     .then(r => r.json())
    //     .then(notes => this.props.setNotes(notes))
    // }


    // <>
    // {/* WELCOME LINE */}
    // {this.props.currentUser ? 
    // <h2>Welcome {this.props.currentUser.username}</h2> : 
    // <strong>loading</strong> }
    // <p>Youve completed {this.progressTracker() * 100} % of your challenges so far! {this.progressTrackerEmotions()}</p>

    // {/* BODY OF PAGE */}
    // <Container fluid>
    //     <Row>
    //         {/* FIRST COLUMN MAPS CHALLENGES */}
    //         <Col md={3}>
    //             <Card>
    //                 <Card.Header>MyChallenges</Card.Header>
                
    //                 {this.filterForMyChallenges().map(myChallenge => 
    //                     <Card.Body>
    //                         <MyChallengeShow 
    //                         myChallenge={myChallenge} 
    //                         currentUser={this.props.currentUser} 
    //                         key={myChallenge.id}/>
                            
    //                         <Card.Footer>
    //                         <label>Add A Note</label>
    //                         <form onSubmit={this.onSubmit} >
    //                             <input name='note' value={this.state.note} type='text' onChange={this.handleChange}/>
    //                             <input name='my_challenge_id' value={myChallenge.id} type='hidden'/>
    //                             <button type='submit'>Submit blah</button>
    //                         </form>
    //                         </Card.Footer>
    //                     </Card.Body>
    //                 )}
    //             </Card>
    //         </Col>

    //         {/* SECOND COLUMN HANDLES POSTS */}
    //         <Col md={3}>
    //             <h2>Posts:</h2>

    //             {this.filterForMyPosts().map(post => <Post 
    //             post={post} 
    //             className='post' 
    //             key={post.id} 
    //             users={this.props.users} 
    //             currentUser={this.props.currentUser}/>
    //             )}
    //         </Col>

    //         {/* THIRD COLUMN HANDLES USER INFO */}
    //         <Col md={3}>
    //             { this.props.currentUser ? 
    //             <Card>
    //                 <Card.Img src={this.props.currentUser.img_url} alt=""/>
    //             <Card.Header>My Info</Card.Header>
    //             <Card.Body>
    //             <small>Username: {this.props.currentUser.username}</small>
    //             <br></br>
    //             <small>Bio: {this.props.currentUser.bio}</small>
    //             <br></br>
    //             <small>Languages I Like: {this.props.currentUser.programming_preferences}</small>
    //             <br></br>
    //             </Card.Body>
    //             <Card.Footer>
    //                 <button onClick={this.toggleEditFormForUser}>Edit Info</button>
    //                 { this.state.showEditForm ? <EditUserForm 
    //                 currentUser={this.props.currentUser}
    //                 updateCurrentUser={this.props.updateCurrentUser}/> : 
    //                 null }
    //             </Card.Footer>
    //             </Card> : 
    //             <p>loading</p>
    //             }   
    //         </Col>

    //         {/* FOURTH COLUMN HANDLES FRIENDS */}
    //         <Col>
    //             <p>friend / friend requests col</p>
    //             <Row>
    //                 <Col>
    //                     <p>Friend Requests</p>
    //                     { this.state.followers.length ? 
    //                     <>
    //                     <p>meep</p>
    //                     {this.state.followers.map(follow => <FriendRequest 
    //                     friend={follow.follower}/>)}
    //                     </> : 
    //                     <p>loading</p>}
    //                 </Col>
    //                 <Col>
    //                     <p>put following here rn for clarity </p>
                        
    //                 </Col>
    //             </Row>
    //         </Col>
    //     </Row>
    // </Container>
    // </>
               