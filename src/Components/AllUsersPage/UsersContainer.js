import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as action from '../../modules/actions/actionCreators'
import Container from 'react-bootstrap/Container'
import UserRow from './UserRowShow'

class UsersContainer extends Component {
    state = { 
        filter: ""
    }

    // Handle Filter
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Filter Method for Searching Users
    searchUsers = () => {
        return [...this.props.users].filter(user => user.username.toLowerCase().includes(this.state.filter.toLowerCase()))
    }

    render() { 
        return ( 
            <>
            <small>users index</small>
            <br></br>
            <input name='filter' type='text' value={this.state.filter} placeholder="search for a user mmmkay" onChange={this.handleChange}/>
            <br></br><br></br><br></br>
            { this.props.users ? 
            <Container fluid>
                {this.searchUsers().map(user => 
                <UserRow user={user}
                currentUser={this.props.currentUser}/>)}
            </Container> : 
        <p>loading users</p>}
        </>
         );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users 
    }
}
 
export default connect(mapStateToProps)(UsersContainer);