import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'

class Comment extends React.Component {

    state = {
        myUser: {},
        editContent: "",
        showEditForm: false
    }

    // EDIT COMMENT PIECES

    // FORM FOR THE EDIT COMMENT FEATURE
    renderEditForm = () => {
        return (         
            <form onSubmit={this.handleEditCommentSubmit}>
                <label>Edit Content</label>
                <input type='text' name='editContent' onChange={this.handleChange} placeholder={this.props.text_content} value={this.state.editContent}/>
                <button type='submit'>Submit</button>
            </form>
        )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // TOGGLE TO VIEW FORM
    toggleEditForm = () => {
    if (this.props.currentUser) {
        if (this.props.currentUser.id === this.props.user_id) {
        this.setState(prevState => {
            return {
                showEditForm: !prevState.showEditForm
            }
        })
        } else {
            alert('you can only edit ur own ~comments dude come on')
    }} else {
        alert('sign in to edit comments')
    }
    }

    // REDUX REFACTORED TO UPDATE COMMENTS UNIVERSALLY IN STATE 
    handleEditCommentSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3001/api/v1/comments/${this.props.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                text_content: this.state.editContent
            })
        })
        .then(r => r.json())
        .then(comment => {
           this.props.updateComment(comment)
        })
    }

    
    // LIFE CYCLE METHODS
    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.findMyUser()
        }
    }

    componentDidMount(){
        this.findMyUser()
    }
    
    findMyUser = () => {
        let users = [...this.props.users]
        let user = users.find(user => user.id === this.props.user_id)
        this.setState({
            myUser: user
        })
    }

    render () {
        return ( 
            <Container className='comment'> 
            <p>{this.state.myUser.username} says, </p>
                <p>"{this.props.text_content}"</p>
                <button onClick={this.toggleEditForm}>⚙️</button>
            { this.state.showEditForm ? this.renderEditForm() : null}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateComment: (comment) => dispatch(action.updateComment(comment))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Comment);