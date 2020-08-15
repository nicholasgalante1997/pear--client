import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'

class UserRow extends Component {
    state = { 
        currentUserFollowing: [],
        currentUserFollowers: []
    }

    // LifeCycle Methods
    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.findMyFollowers()
            this.findWhoIFollow()
        }
    }

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
            alert(`Friend Request Sent To ${follow.followee.username}`)
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


    render() { 
        return ( 
            <Row className='user-row'>
                <Col xs={2}>
                    <Image src={this.props.user.img_url} thumbnail/>
                </Col>
                <Col md={2}>
                <strong>{this.props.user.username}</strong>
                </Col>
                <Col md={6}className='user-row-bio'>
                <small>Bio: {this.props.user.bio}</small>
                </Col>
                <Col xs={2}>
                    <form onSubmit={this.handleFollowSubmit}>
                    <button type='submit'>Add Friend</button>
                    </form>
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
        addFollow: (follow) => dispatch(action.addFollow(follow))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(UserRow);