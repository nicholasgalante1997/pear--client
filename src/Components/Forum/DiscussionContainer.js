import React, { Component } from 'react';
import Post from './Post'
import {connect} from 'react-redux'

class DiscussionContainer extends Component {
    state = { 
        currentTopic: ""
     }


    // SEARCH BAR FUNCTIONALITY
    filterFunc = () => {
        let sortedPosts = [...this.props.posts]
        return sortedPosts.filter((post) => post.topic.toLowerCase().includes(this.state.currentTopic.toLowerCase()))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    // // Shortcut for SEARCHBAR
    // quickLookUp = (event) => {
    //     this.setState({
    //         currentTopic: event.target.name
    //     })
    // }

    render() { 
        return ( 
            <div>
                <p>Search for a Discussion Thread or Start Your Own</p>
                <input onChange={this.handleChange} name='currentTopic' type='text' value={this.state.currentTopic} placeholder='Search by Topic'/>
                
                {this.filterFunc().map(post => <Post 
                post={post} 
                className='post' 
                key={post.id} 
                currentUser={this.props.currentUser} 
                />)}

            </div>
         );
        
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        users: state.users
    }
}
 
export default connect(mapStateToProps)(DiscussionContainer);