import React from 'react';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const AboutPage = () => {
    return ( 
        <Container>
            <Row>
                <br></br>
                <Row>
                    <Col md={2}>
                        <img className='about-page' src="data:image/png;base64,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"/>
                    </Col>
                    <Col>
                        <heavy className='about-header'> Come on Down and Meet Some Devs!</heavy>
                        <p>All these Devs here are part of our FlatIron SE Special, mixed in with a little dirt, little less sun, and a whole lot of 'Tegridy</p>
                    </Col>
                    <Row>
                        <Col md={2}>
                            <Image className='about-image' src='https://vignette.wikia.nocookie.net/southpark/images/c/c2/Craig-tucker.png/revision/latest/scale-to-width-down/340?cb=20160402121203'/>
                        </Col>
                        <Col md={10}>
                            <strong>Hi Im 'Craig' Dwyer,</strong>
                            <p>Im the head of creative design here at pearProgramming. You may have heard of my hit astrology app Zodiapp, funny story about that app; was actually supposed to be a music application but i kept spelling signs instead of sings and halfway through I just converted the whole project to zodiac signs. Adapt and overcome baby.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <strong>Hi Im Sean Padden,</strong>
                            <p>and I head the operations and day to day problem solving of the team. From my humble beginnings as an apprentice woodworker, I crafted my first computer together from pine nuts and cherry wood, and from that wood computer Dell was born.</p>
                        </Col>
                        <Col md={2}>
                            <Image className='about-image' src='https://southparkstudios.mtvnimages.com/avatar/store/20200819/20200819_161939_77eb1f9353224cb11a45a3900c871a21.png'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Image className='about-image' src='https://southparkstudios.mtvnimages.com/avatar/store/20200820/20200820_152316_8bb0aae8793e49dbbc95ba7d35800683.png'/>
                        </Col>
                        <Col md={10}>
                            <strong>Hi Im Yoan Ante,</strong>
                            <p>Im the head of front end design here at pearProgramming, and yeah you guessed it that includes space exploration. Little known fact, i designed the first ruby on rails application to run on the surface of mars. What was the app you ask? Come to Mars and find out.</p>
                        </Col>
                    </Row>
                </Row>
            </Row>
            <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
        </Container>
     );
}
 
export default AboutPage;