import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class FriendRequest extends Component {
    state = {  }
    render() { 
        return ( 
            <Row>
                <Col sm={4}>
                    <Image src={this.props.friend.img_url}/>
                </Col>
                <Col>
                    <small>{this.props.friend.username}</small>
                    <button>Accept</button>
                </Col>
            </Row>
         );
    }
}
 
export default FriendRequest;