import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './Components/Navigation/NavBar'
import ForumContainer from './Components/Forum/ForumContainer';
import AuthContainer from './Components/LogIn/AuthContainer'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    user: {
      id: 0,
      username: "",
      myChallenges: []
    },
    challenges: [],
    rubyChallenges: [],
    pythonChallenges: [],
    nodeChallenges: [],
    javaChallenges: [],
    phpChallenges: [],
    backendChallenges: [],
    users: []
  }

  fetchChallenges = () => {
    fetch('http://localhost:3001/api/v1/challenges')
    .then(r => r.json())
    .then(challenges => this.sortChallenges(challenges))
  }
 
  componentDidMount(){
    this.fetchChallenges()
    this.fetchUsers()
  }

  sortChallenges = (challenges) => {
    let python = []
    let backend = []
    let ruby = []
    let node = []
    let php = []
    let java = []
    let copy = [...challenges]
    copy.forEach(challenge => {
      if (challenge.topic.includes('Python')) {
        python.push(challenge)
      } else if (challenge.topic.includes('Backend Challenge: No Specific Language')) {
        backend.push(challenge)
      } else if (challenge.topic.includes("Ruby & Rails")) {
        ruby.push(challenge)
      } else if (challenge.topic.includes("Node.js")) {
        node.push(challenge)
      } else if (challenge.topic.includes('PHP')) {
        php.push(challenge)
      } else if (challenge.topic.includes("Java")) {
        java.push(challenge)
      }
    })
   this.setState({
       rubyChallenges: ruby,
       pythonChallenges: python,
       nodeChallenges: node,
       javaChallenges: java,
       backendChallenges: backend,
       phpChallenges: php,
       challenges: challenges
   })
  }

  fetchUsers = () => {
    fetch('http://localhost:3001/api/v1/users')
    .then(r => r.json())
    .then(users => this.setState({users}))
  }

  render () {
    // console.log(this.state)
    return (
    <div className="App">
      <NavBar/>
      <Switch>

        <Route exact path='/forum' render={(routerProps) => 
        <ForumContainer {...routerProps} challenges={this.state.challenges} users={this.state.users}/>}/>
        
        <Route exact path='/login' render={(routerProps) => 
        <AuthContainer {...routerProps} />} />
        
        <Route exact path='/profile' render={(routerProps) => 
        <h2>User Profile Page</h2>}/>
        
        <Route exact path='/challenges/:topic' render={(routerProps) => 
        <>
          <h2>Challenge Topic</h2>
          <p>list of challenges within the topic, and info on each challenge</p>
        </>}/>

        <Route exact path='/challenges' render={(routerProps) => 
        <h2>Challenges Topic Card Page</h2>}/>

      </Switch>
    </div>
  )}
}

export default App;
