import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'

class Post extends React.Component {

    state = {
        newComment: "",
        myUser: {},
        viewComments: false,
        newCommentsToRender: [],
        showEditForm: false,
        editTopic: "",
        editContent: "",
        editedPostsToRender: {}
    }

    handleEditSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3001/api/v1/posts/${this.props.post.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                topic: this.state.editTopic,
                text_content: this.state.editContent
            })
        })
        .then(r => r.json())
        .then(post => {
            this.props.toggleForEditPost()
        })
    }

    toggleEditForm = () => {
        if (this.props.currentUser) {
        if (this.props.currentUser.id === this.props.post.user_id) {
        this.setState(prevState => {
            return {
                showEditForm: !prevState.showEditForm
            }
        })
    } else {
        alert('you can only edit ur own posts dude come on')
    }} else {
        alert('sign in to edit')
    }}

    renderEditForm = () => {
        return (
            
            <form onSubmit={this.handleEditSubmit}>
                <label>Topic:</label>
                <input name='editTopic' onChange={this.handleChange} type='text' placeholder={this.props.post.topic} value={this.state.editTopic}/>
                <label>Edit Content</label>
                <input type='text' name='editContent' onChange={this.handleChange} placeholder={this.props.post.text_content} value={this.state.editContent}/>
                <button type='submit'>Submit</button>
            </form>
        )
    }

    toggleComments = () => {
        this.setState(prevState => {
            return {
                viewComments: !prevState.viewComments
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    findMyUser = () => {
        let users = [...this.props.users]
        let user = users.find(user => user.id === this.props.post.user_id)
        this.setState({
            myUser: user
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.props.currentUser) {
        fetch('http://localhost:3001/api/v1/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'applciation/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                post_id: this.props.post.id,
                text_content: this.state.newComment
            })
        })
        .then(r => r.json())
        .then(comment => {
            this.setState(prevState => {
                return {
                    newComment: "",
                }
            }, () => {
                this.props.addComment(comment)
            })
        })
    } else {
        alert('jesus bro sign in already')
    }
    }

    render () {
    return ( 
        <Row>
            <Card>
    <Card.Title>{this.props.post.user.username}: {this.props.post.topic}</Card.Title>
    <Card.Body>{this.props.post.text_content}</Card.Body>
    <Card.Body>
        <button onClick={this.toggleEditForm}>⚙️</button>
    { this.state.showEditForm ? this.renderEditForm() : null}
    </Card.Body>
    { this.state.viewComments ? 
    <>
    <Card.Body>Comments:</Card.Body>
    <Card.Body>{[...this.props.post.comments, ...this.state.newCommentsToRender].map((comment) => <Comment {...comment} key={comment.id} users={this.props.users} toggleForEditComment={this.props.toggleForEditComment} currentUser={this.props.currentUser}/> )}</Card.Body> 
    </> : 
    null }
    <Card.Footer>
        {this.state.viewComments ? <button onClick={this.toggleComments}>Hide Comments</button> : <button onClick={this.toggleComments}>View Comments</button>}
        <form className='add-comment' onSubmit={this.handleSubmit}>
            <input name='newComment' value={this.state.newComment} onChange={this.handleChange} placeholder='Add a comment here' type='text'/>
            <button type='submit'>Comment</button>
        </form>
    </Card.Footer>
            </Card>
        </Row> 
     );}
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (comment) => dispatch(action.addComment(comment))
    }
}
 
export default connect(null, mapDispatchToProps)(Post);