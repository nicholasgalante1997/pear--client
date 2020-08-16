import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Challenge from './ChallengesShow'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class ChallengesContainer extends Component {
    state = { 
        difficulty: ""
    }

    filterDifficulty = () => {
        return [...this.props.challenges].filter(challenge => challenge.difficulty.includes(this.state.difficulty))
    }

    setDifficultyToEasy = () => {
       this.setState({
           difficulty: "Easy"
       })
    }
    setDifficultyToMed = () => {
        this.setState({
            difficulty: "Med"
        })
     }
     setDifficultyToHard = () => {
        this.setState({
            difficulty: "Hard"
        })
     }
     resetDifficulty = () => {
        this.setState({
            difficulty: ""
        })
    }
    
    render() { 
        console.log(this.state, this.filterDifficulty())
        return ( 
            <Container fluid className='challenge-container'>
                <h2>Select A Challenge!</h2>
                <br></br>
                <br></br>

                {/* DROP DOWN FOR SORT ON DIFFICULTY */}
                <DropdownButton id="dropdown-basic-button" title="DIFFICULTY">
                    <Dropdown.Item onClick={this.setDifficultyToEasy} name='Easy'>EASY</Dropdown.Item>
                    <Dropdown.Item onClick={this.setDifficultyToMed} name='Med'>MEDIUM</Dropdown.Item>
                    <Dropdown.Item onClick={this.setDifficultyToHard} name='Hard'>HARD</Dropdown.Item>
                    <Dropdown.Item onClick={this.resetDifficulty} name='Reset'>RESET DIFFICULTY</Dropdown.Item>
                </DropdownButton>
                <br></br>
                <Row>
                {this.filterDifficulty().map(challenge => 
                    <Challenge challenge={challenge} currentUser={this.props.currentUser}/>
                )}
                </Row>
               
            </Container>
         );
    }
}
 
export default ChallengesContainer;