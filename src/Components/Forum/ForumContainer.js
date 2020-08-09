import React, { Component } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DiscussionContainer from './DiscussionContainer'

class ForumContainer extends Component {
    state = { 
        posts: [],
        newPostContent: "",
        newPostTopic: "",
        showNewThreadContent: false
    }

    toggleNewThreadContent = () => {
        this.setState(prevState => {
            return {
                showNewThreadContent: !prevState.showNewThreadContent
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderNewThreadForm = () => {
      return (  
        <Card.Footer>
            <form className='new-post-form' onSubmit={this.handleSubmit}>
                <strong>New Discussion Form!</strong><br></br>
                <label>Thread Topic;</label>
                <input name='newPostTopic' placeholder='Thread Topic' value={this.state.newPostTopic} onChange={this.handleChange} type='text'/>
                <label>New Post Content</label>
                <input placeholder='Begin Writing Post' name='newPostContent' value={this.state.newPostContent} onChange={this.handleChange} type='text'/>
                <button type='submit'>Post</button>
                <button onClick={this.toggleNewThreadContent}>Hide Form</button>
            </form>
        </Card.Footer>
      );
    }

    render() { 
        console.log(this.props)
        return ( 
            <div>
                <h2>Welcome To the Forum!</h2>
                <br></br>
                <br></br>
                <br></br>
                <Container fluid>
                    <Row>
                        <Col md={4} className='side-bar'>
                            <Card>
                                <Card.Title>Genre Side Bar</Card.Title>
                            </Card>
                        </Col>
                        <Col md={4} className='disc-container'>
                            <Card>
                                <Card.Title>Main Post Container</Card.Title>
                                <DiscussionContainer posts={this.props.posts} users={this.props.users}/>
                               {this.state.showNewThreadContent ? this.renderNewThreadForm() : <button onClick={this.toggleNewThreadContent}>Show New Thread Form</button>}
                               
                               
                                {/* <Card.Footer>
                                    <form className='new-post-form'>
                                        <input placeholder='Begin Writing Post' name='newPostContent' value={this.state.newPostContent} onChange={this.handleChange} type='text'/>
                                        <button type='submit'>Post</button>
                                    </form>
                                </Card.Footer> */}
                            </Card>
                        </Col>
                        <Col md={4} className='Suggested Challenges'>
                            <Card>
                                <Card.Title>Suggested Challenges</Card.Title>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
         );
    }
}
 
export default ForumContainer;