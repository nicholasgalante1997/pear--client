import React from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const AboutPage = () => {
    return ( 
        <Container>
            <Row>
                <heavy>Meet The Team Behind Your Favorite Pair Programming App!</heavy>
                <br></br>
                <Row>
                    <Col md={2}>
                        <Image src=""/>
                    </Col>
                </Row>
            </Row>
        </Container>
     );
}
 
export default AboutPage;