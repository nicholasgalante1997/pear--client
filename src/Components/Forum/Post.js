import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'

class Post extends React.Component {

    state = {
        newComment: "",
        myUser: {}
    }

  componentDidUpdate(prevProps, prevState){
      if (prevProps.users !== this.props.users){
          this.findMyUser()
      }
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

    render () {
    console.log(this.props, this.state)
    return ( 
        <Row>
            <Card>
    <Card.Title>{this.state.myUser.username}: {this.props.post.topic}</Card.Title>
    <Card.Body>{this.props.post.text_content}</Card.Body>
    <Card.Body>Comments:</Card.Body>
    <Card.Body>{this.props.post.comments.map((comment) => <Comment {...comment} key={comment.id}/> )}</Card.Body>
    <Card.Footer>
        <form className='add-comment'>
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