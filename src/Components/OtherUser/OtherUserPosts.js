import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class OtherUserPost extends Component {
    state = { 
        showComments: false,
        newComment: ""
    }

        handleCommentSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3001/api/v1/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                post_id: this.props.post.id,
                text_content: this.state.newComment,
                user_id: this.props.currentUser.id 
            })
        })
        .then(r => r.json())
        .then(comment => {
            this.props.addComment(comment)
            this.setState({
                showComment: false,
                newComment: ""
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleShowComments = () => {
        this.setState(prevState => {
            return {
                showComments: !prevState.showComments
            }
        })
    }

    renderComments = () => {
        if (this.props.comments) {
        return (
            <>
            {this.findMyComments().map(comment => 
            <Row>
            <small>{comment.user.username}: {comment.text_content}</small>
            </Row>)}
            <Row>
            <form onSubmit={this.handleCommentSubmit}>
            <input type='text' value={this.state.newComment} name='newComment' placeholder='comment...' onChange={this.handleChange}/>
            <button type='submit'>hit me</button>
            </form>
            </Row>
        </>
        )
        }
    }


    findMyComments = () => {
        return [...this.props.comments].filter(comment => comment.post_id === this.props.post.id)
    }
    

    render() { 
        console.log(this.props, this.findMyComments())
        return ( 
            <Row>
                <Col md={8}>
            <strong>On <em className='pop-yellow'>{this.props.post.topic}</em> ; <small>{this.props.post.text_content}</small></strong>
            </Col>
            <Col md={4}>
            <p className='smaller' onClick={this.toggleShowComments}>Show Comments</p>
            </Col>
            {this.state.showComments ? 
            this.renderComments() : 
            null }
            </Row>
         );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: comment => dispatch(action.addComment(comment))
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(OtherUserPost);