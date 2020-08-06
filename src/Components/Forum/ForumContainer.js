import React, { Component } from 'react';

class ForumContainer extends Component {
    state = { 
        posts: [],
        challenges: []
     }
    fetchPosts = () => {
        fetch('http://localhost:3001/api/v1/posts')
        .then(r => r.json())
        .then(posts => this.setState({posts}))
    }

    fetchChallenges = () => {
        fetch('http://localhost:3001/api/v1/challenges')
        .then(r => r.json())
        .then(challenges => this.setState({challenges}))
    }
    componentDidMount(){
        this.fetchPosts()
        this.fetchChallenges()
        console.log(this.state)
    }

    

    render() { 
        console.log(this.state)
        return ( 
            <div>
                <p>in the forum!</p>
            </div>
         );
    }
}
 
export default ForumContainer;