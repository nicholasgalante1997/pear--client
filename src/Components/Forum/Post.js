import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'
import * as action from '../../modules/actions/actionCreators'
import {connect} from 'react-redux'


class Post extends React.Component {

    state = {
        newComment: "",
        viewComments: false,
        newCommentsToRender: [],
        showEditForm: false,
        editTopic: "",
        editContent: "",
        editedPostsToRender: {}
    }

    // REFACTORED FOR IMMEDIATE RERENDER/UPDATE WITH REDUX
    // CAUTION: SUBMISSIONN OF EDITED POST WITHOUT REENTRY OF PAST VALUES ENDS UP RESETTING PAST VALUES TO EMPTY BUT DOES UPDATE IMMEDIATELY
    // THATS A SLIGHT BUG

    // METHODS FOR THE EDIT / PATCH EVENTS FOR POSTS
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
            this.props.updatePost(post)
        })
    }
    
    // TOGGLE VIEW FOR EDIT FORM
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
            }
        } else {alert('sign in to edit')}
    }

    // RENDER EDIT
    renderEditForm = () => {
        return (      
            <form onSubmit={this.handleEditSubmit}>
                <label>Topic:</label>
                <input name='editTopic' onChange={this.handleChange} type='text' placeholder={this.props.post.topic} value={this.state.editTopic}/>
                <br></br>
                <label>Edit Content</label>
                <input type='text' name='editContent' onChange={this.handleChange} placeholder={this.props.post.text_content} value={this.state.editContent}/>
                <button className='btn' type='submit'>Submit</button>
            </form>
        )
    }
    
    handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
    }

    // COMMENT METHODS

    // TOGGLE VIEW OF COMMENTS
    toggleComments = () => {
        this.setState(prevState => {
            return {
                viewComments: !prevState.viewComments
            }
        })
    }

    // REDUX METHOD FOR FILTERING THROUGH ALL THE COMMENTS AND RENDERING ONLY THE COMMENTS 
    // THAT BELONG TO THAT INDIVIDUAL POST 
    // AND HANDLES AUTO RERENDER OF THE COMMENTS ON ADDING A NEW COMMENT 
    filterForMyComments = () => {
        return [...this.props.comments].filter(comment => comment.post_id === this.props.post.id)
    }
    
    // REFACTORED FOR REDUX
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
        <>
        {/* MAIN CONTENT ROW */}
        <Row>
            {/* AVATAR */}
            <Col sm={3}>
                <Image src={this.props.post.user.img_url}/>
            </Col>
            {/* CONTENT */}
            <Col>
                <strong>{this.props.post.user.username}, On <em className='post-topic' name={this.props.post.topic}>{this.props.post.topic}</em>;</strong>
                <p>{this.props.post.text_content}</p>
            </Col>
            {/* EDIT FORM AND VIEW COMMENTS */}
            <Col sm={3}>
                    <button onClick={this.toggleEditForm}>⚙️</button>
                    <br></br>
                    {this.state.viewComments ? <button className='btn' onClick={this.toggleComments}>Hide Comments</button> : <button onClick={this.toggleComments}>View Comments</button>}
            </Col>
        </Row>

        <br></br>
        {/* SECONDARY ROW FOR EDIT POST FORM IF TRYING TO EDIT POST */}
        <Row>
            { this.state.showEditForm ? this.renderEditForm() : null }
        </Row>
        
        {/* THIRD ROW FOR COMMENTS AND COMMENTING */}
        <Row>
        { this.state.viewComments ? 
                <>
                    <Col sm={2}>Comments:</Col>
                    <Col>{this.filterForMyComments().map((comment) => <Comment 
                    {...comment} 
                    key={comment.id}  
                    currentUser={this.props.currentUser}/> )
                    } 
                    <br>
                    </br>
                    <form className='add-comment' onSubmit={this.handleSubmit}>
                    <input name='newComment' value={this.state.newComment} onChange={this.handleChange} placeholder='Add a comment here' type='text'/>
                    <button className='btn' type='submit'>Comment</button>
                    </form>
                    </Col> 
                </> : 
                null }
        </Row>
        </>
     );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (comment) => dispatch(action.addComment(comment)),
        updatePost: (post) => dispatch(action.updatePost(post))
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        users: state.users
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Post);


// REDUX REFACTOR EXTRA JUNK 

    // findMyUser = () => {
    //     let users = [...this.props.users]
    //     let user = users.find(user => user.id === this.props.post.user_id)
    //     this.setState({
    //         myUser: user
    //     })
    // }

 {/* <Row>
            <Card>
                <Card.Title>{this.props.post.user.username}: {this.props.post.topic}</Card.Title>
                <Card.Body>{this.props.post.text_content}</Card.Body>
                <Card.Body>
                    <button onClick={this.toggleEditForm}>⚙️</button>
                    { this.state.showEditForm ? this.renderEditForm() : null }
                </Card.Body>
                { this.state.viewComments ? 
                <>
                    <Card.Body>Comments:</Card.Body>
                    <Card.Body>{this.filterForMyComments().map((comment) => <Comment 
                    {...comment} 
                    key={comment.id}  
                    currentUser={this.props.currentUser}/> )
                    }
                    </Card.Body> 
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
        </Row>  */}
  