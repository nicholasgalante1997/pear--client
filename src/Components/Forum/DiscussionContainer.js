import React, { Component } from 'react';
import Post from './Post'

class DiscussionContainer extends Component {
    state = { 
        currentTopic: ""
     }

    filterFunc = () => {
        let sortedPosts = [...this.props.posts]
        // sortedPosts.filter(post => post.topic.includes(this.state.currentTopic))
        return sortedPosts.filter((post) => post.topic.toLowerCase().includes(this.state.currentTopic.toLowerCase()))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render() { 
        console.log(this.filterFunc())
        return ( 
            <>
                <p>Search for a Discussion Thread or Start Your Own</p>
                <input onChange={this.handleChange} name='currentTopic' type='text' value={this.state.currentTopic} placeholder='Search by Topic'/>
                {this.filterFunc().map(post => <Post post={post} className='post' key={post.id} users={this.props.users}/>)}

            </>
         );
    }
}
 
export default DiscussionContainer;