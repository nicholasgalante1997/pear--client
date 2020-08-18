import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {connect} from 'react-redux'
import Image from 'react-bootstrap/Image'
import * as action from '../../modules/actions/actionCreators'

class OtherUserShow extends Component {
    state = { 
        otherUser: {},
        myPosts: []
     }

    componentDidMount(){
        const id = this.props.match.params.id 
        fetch(`http://localhost:3001/api/v1/users/${id}`)
        .then(r => r.json())
        .then(user => this.setState({otherUser: user}))
    }

    // FIND MY FOLLOWERS 
    findMyFollowers = () => {
        return [...this.props.follows].filter(follow => follow.followee.id === this.state.otherUser.id)
    }

    // FIND MY FOLLOWING
    findWhoIFollow = () => {
        return [...this.props.follows].filter(follow => follow.follower.id === this.state.otherUser.id)
    }

    // FIND MY POSTS 
    filterForMyPosts = () => {
       return [...this.props.posts].filter(post => post.user_id === this.state.otherUser.id)
    }

    // FIND MY CHALLENGES
    filterForMyChallenges = () => {
        return [...this.props.my_challenges].filter(my_challenge => my_challenge.user.id === this.state.otherUser.id)
    }

    // FOLLOW FROM THE USER SHOW PAGE
    postFollow = () => {
        const id = this.props.match.params.id
        fetch('http://localhost:3001/api/v1/follows', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                follower_id: this.props.currentUser.id,
                followee_id: id
            })
        })
        .then(r => r.json())
        .then(follow => {
            this.props.addFollow(follow)
            alert(`Following ${follow.followee.username}`)
        })
    }

    render() { 
        console.log(this.props, this.state)
        return ( 
            <>
            <br></br>
            { this.state.otherUser.username ? 
            <>
        <Container>
            <Row className='other-user-show'>
               <Col md={1}>
                <Image src={this.state.otherUser.img_url} className='profile-avi'/>
                </Col>
               <Col md={2} className='other-user-attributes'>
               <Row>
                <heavy className='other-user-name'>{this.state.otherUser.username}</heavy>
                </Row>
                <Row>
                <small>Followers: <em className='pop-red'>{this.findMyFollowers().length}</em></small>
                <small>Following: <em className='pop-red'>{this.findWhoIFollow().length}</em></small>
                </Row>
                <Row>
                <small>Langs: <em className='pop-violet'>{this.state.otherUser.programming_preferences}</em></small>
                </Row>
                <Row>
                    {(this.findMyFollowers().find(follow => follow.follower.id === this.props.currentUser.id)) ? 
                     <button className='btn'>following</button> : 
                     <button onClick={this.postFollow}>Follow</button>}
                </Row>
                </Col>
                <Col className='other-bio'>
                    <heavy>Oh and a little about me;</heavy>
                    <Row>
                        <small className='other-user-bio-spec'>{this.state.otherUser.bio}</small>
                    </Row>
                </Col>
             </Row>  
             <br></br>
                {/* SECOND ROW */} 
                <Row>
                    <Col md={2} className='other-user-relations'>
                       <Row>
                            <em className='pop-red-push-right'>Followers:</em>    
                            <ul>
                                {this.findMyFollowers().map(follow =>  
                                <li>
                                    <Image className='follow-image-shrink' src={follow.follower.img_url}/>
                                    <small className='force-shrink-font'>{follow.follower.username}</small>
                                </li>)}    
                            </ul>   
                       </Row>
                       <Row>
                            <em className='pop-red-push-right'>Following:</em>    
                            <ul>
                                {this.findWhoIFollow().map(follow =>  
                                <li>
                                    <Image className='follow-image-shrink' src={follow.followee.img_url}/>
                                    <small className='force-shrink-font'>{follow.followee.username}</small>
                                </li>)}    
                            </ul>   
                       </Row>
                    </Col>
                    <Col md={5} className='other-user-posts'>
                        <Row>
                        <em className='pop-red-push-posts'>Posts;</em>
                        </Row>
                        <Row>
                        <ul>
                            {this.filterForMyPosts().map(post => 
                            <li>
                            <strong>On <em className='pop-yellow'>{post.topic}</em> ; <small>{post.text_content}</small></strong>
                            </li>
                            )}
                        </ul>
                        </Row>
                        </Col>
                        <Col md={5} className='other-user-challenges'>
                            <em className='pop-red'>Challenges</em>
                            <ul>
                            {this.filterForMyChallenges().map(my_challenge => <li>{my_challenge.challenge.title}</li>)}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </> :
                <p>loading</p>
            }
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        my_challenges: state.my_challenges,
        follows: state.follows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFollow: (follow) => dispatch(action.addFollow(follow))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(OtherUserShow);