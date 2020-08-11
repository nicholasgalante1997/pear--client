import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'

class Post extends React.Component {

    state = {
        newComment: "",
        myUser: {},
        viewComments: false,
        newCommentsToRender: []
    }

    toggleComments = () => {
        this.setState(prevState => {
            return {
                viewComments: !prevState.viewComments
            }
        })
    }

//   componentDidUpdate(prevProps, prevState){
//       if (prevProps.users !== this.props.users){
//           this.findMyUser()
//       } 
//   }

    // componentDidMount(){
    //     (this.props.users !== undefined && this.findMyUser())
    // }

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
                    newCommentsToRender: [...prevState.newCommentsToRender, comment]
                }
            })
        })
    } else {
        alert('jesus bro sign in already')
    }
    }

    render () {
    console.log(this.props, this.state)
    return ( 
        <Row>
            <Card>
    <Card.Title>{this.props.post.user.username}: {this.props.post.topic}</Card.Title>
    <Card.Body>{this.props.post.text_content}</Card.Body>
    { this.state.viewComments ? 
    <>
    <Card.Body>Comments:</Card.Body>
    <Card.Body>{[...this.props.post.comments, ...this.state.newCommentsToRender].map((comment) => <Comment {...comment} key={comment.id} users={this.props.users}/> )}</Card.Body> 
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
            {/* <strong>{props.post.user_id}</strong>
            <strong>{props.post.topic}</strong>
            <small>{props.post.text_content}</small>
            <label>Comments</label>
            {props.post.comments.map((comment) => <Comment {...comment} />)} */}
        </Row>
     );}
}
 
export default Post;