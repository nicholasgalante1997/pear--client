import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'

class Comment extends React.Component {

    state = {
        myUser: {}
    }
    

    componentDidMount(){
        this.findMyUser()
    }
    // componentDidUpdate (prevProps, prevState) {
    //     if (prevProps.users !== this.props.users) {
    //         this.findMyUser()
    //     }
    // }

    findMyUser = () => {
        let users = [...this.props.users]
        let user = users.find(user => user.id === this.props.user_id)
        this.setState({
            myUser: user
        })
    }

    render () {
        console.log(this.props)
    return ( 
        <Container className='comment'> 
        <p>{this.state.myUser.username} says, </p>
            <p>"{this.props.text_content}"</p>
        </Container>
           
    
     );}
}
 
export default Comment;