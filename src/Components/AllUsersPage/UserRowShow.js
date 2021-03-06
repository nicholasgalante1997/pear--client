import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'

class UserRow extends Component {
    state = { 
        currentUserFollowing: [],
        currentUserFollowers: [],
        shuffle: false
    }

    // LifeCycle Methods
    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.findMyFollowers()
            this.findWhoIFollow()
            // this.toggleShuffle()
        }
    }

    componentDidMount(){
        if (this.props.currentUser) {
            this.findMyFollowers()
            this.findWhoIFollow()
        } 
    }
    // toggleShuffle = () => {
    //     this.setState(prevState => {
    //         return {
    //             shuffle: !prevState.shuffle
    //         }
    //     })
    // }
    // Set Current User Relationships to Local State
    findMyFollowers = () => {
        if (this.props.follows) {
            let followers = [...this.props.follows].filter(follow => follow.followee_id === this.props.currentUser.id)
            this.setState({
                currentUserFollowers: followers
            })
        } else {
            return null 
        }
    }

    findWhoIFollow = () => {
        if (this.props.follows) {
            let following = [...this.props.follows].filter(follow => follow.follower_id === this.props.currentUser.id)
            this.setState({
                currentUserFollowing: following
            })
        }
    }

    // POST METHOD FOR FOLLOW 
    postFollow = () => {
        fetch('http://localhost:3001/api/v1/follows', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                follower_id: this.props.currentUser.id,
                followee_id: this.props.user.id 
            })
        })
        .then(r => r.json())
        .then(follow => {
            this.props.addFollow(follow)
            alert(`Following ${follow.followee.username}`)
        })
    }

    // DELETE METHOD ON FOLLOWS 
    handleDeleteFollow = () => {
        let followInstance = [...this.state.currentUserFollowing].find(follow => follow.followee.id === this.props.user.id)
        fetch(`http://localhost:3001/api/v1/follows/${followInstance.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(data => {
            this.setState(prevState => {
             return {
                 currentUserFollowing: prevState.currentUserFollowing.filter(follow => follow.id !== followInstance.id)
             }   
            })
            this.props.removeFollow(followInstance.id)
        })
        
    }

    // POST FOR FOLLOWING ANOTHER USER 
    handleFollowSubmit = (event) => {
        event.preventDefault()
        if (this.props.user.id !== this.props.currentUser.id) {
            // check to see if current user already follows this user 
            if (this.state.currentUserFollowing.find(follow => follow.followee_id === this.props.user.id)){
                alert('you already have requested this user as a friend')
            } else {
                // POST METHOD FOR A NEW FOLLOW 
                this.postFollow()
            };
        } else {
            alert('cant add yourself as a friend')
        }
    }

    // METHOD FOR USER SHOW PAGE AVIGATION 
    onUserShowClick = () => {
        this.props.history.push(`/users/${this.props.user.id}`)
    } 

    render() { 
        return ( 
            <Row className='user-row'>
                <Col xs={2}>
                    <Image src={this.props.user.img_url} thumbnail/>
                </Col>
                <Col md={2}>
                <strong onClick={this.onUserShowClick}>{this.props.user.username}</strong>
                </Col>
                <Col md={6}className='user-row-bio'>
                <Row><small className='user-row-bio'>Bio: {this.props.user.bio}</small></Row>
                <Row><small className='user-row-lang'>Langs: {this.props.user.programming_preferences}</small></Row>
                </Col>
                <Col xs={2}>
                    { this.props.currentUser ?
                    <>
                    { (this.state.currentUserFollowing.find(follow => follow.followee_id === this.props.user.id)) ?
                    <button className='btn' onClick={this.handleDeleteFollow}>following</button>
                    : <form onSubmit={this.handleFollowSubmit}>
                    <button type='submit'>Follow</button>
                    </form>
                    }     
                    </> : 
                    <p>loading</p>  }
                </Col>
            </Row>
         );
    }
}

const mapStateToProps = state => {
    return {
        follows: state.follows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFollow: (follow) => dispatch(action.addFollow(follow)),
        removeFollow: (follow) => dispatch(action.removeFollow(follow))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
