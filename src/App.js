import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './Components/Navigation/NavBar'
import ForumContainer from './Components/Forum/ForumContainer';
import AuthContainer from './Components/LogIn/AuthContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChallengesContainer from './Components/Challenges/ChallengesContainer';
import GenreContainer from './Components/Challenges/GenreShow'
import UserShow from './Components/UserPage/UserShow'

class App extends Component {

  state = {
    currentUser: null,
    challenges: [],
    rubyChallenges: [],
    pythonChallenges: [],
    nodeChallenges: [],
    javaChallenges: [],
    phpChallenges: [],
    backendChallenges: [],
    users: [],
    posts: [],
    allMyChallenges: []
  }  
  
  componentDidMount(){
    const token = localStorage.token 

    if (token) {
      fetch('http://localhost:3001/api/v1/auto_login', {
        headers: {
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
        this.setState({
          currentUser: response
        })}
      })
    }
    this.fetchChallenges()
    this.fetchUsers()
    this.fetchPosts()
    this.fetchMyChallenges()
  }

  handleAuth = () => {
    const token = localStorage.token

    if (token) {
      fetch('http://localhost:3001/api/v1/auto_login', {
        headers: {
          "Authorization": token 
        }
      })
      .then(r => r.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
        this.setState({
          currentUser: response.user
        })}
      })
    }
  }

  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem('token')
      this.props.history.push('/login')
    })
  }

  setUser = (response) => {
    this.setState({
      currentUser: response.user 
    }, () => {
      localStorage.token = response.token
      this.props.history.push('/forum')
    })
  }

  fetchMyChallenges = () => {
    fetch('http://localhost:3001/api/v1/my_challenges')
    .then(r => r.json())
    .then(myChallenges => this.setState({
      allMyChallenges: myChallenges
    }))
  }

  fetchChallenges = () => {
    fetch('http://localhost:3001/api/v1/challenges')
    .then(r => r.json())
    .then(challenges => {
      this.sortChallenges(challenges)
      }
      )
  }

  fetchPosts = () => {
    fetch('http://localhost:3001/api/v1/posts')
    .then(r => r.json())
    .then(posts => this.setState({posts}))
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
    .then(users => this.setState({
      users: users,
      // Temporary Current User before setting up Auth and Log In/Sign UP features
      // currentUser: users[0]
    }))
  }


  render () {
    console.log(this.state)
    return (
    <div className="App">
      <NavBar logout={this.logout} currentUser={this.state.currentUser}/>
      <Switch>

        <Route exact path='/challenges/ruby' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.rubyChallenges} {...routerProps} currentUser={this.state.currentUser}/>}/>

        <Route exact path='/challenges/nodejs' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.nodeChallenges} {...routerProps} currentUser={this.state.currentUser}/>}/>

        <Route exact path='/challenges/java' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.javaChallenges} {...routerProps} currentUser={this.state.currentUser}/>}/>   

        <Route exact path='/challenges/python' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.pythonChallenges} {...routerProps} currentUser={this.state.currentUser}/>}/>

        <Route exact path='/challenges/backend' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.backendChallenges} {...routerProps} currentUser={this.state.currentUser}/>}/>

        <Route exact path='/challenges/php' render={(routerProps) => 
        <ChallengesContainer challenges={this.state.phpChallenges} {...routerProps}/>} currentUser={this.state.currentUser}/>

        <Route exact path='/forum' render={(routerProps) => 
        <ForumContainer {...routerProps} challenges={this.state.challenges} users={this.state.users} posts={this.state.posts} currentUser={this.state.currentUser}/>}/>
        
        <Route exact path='/login' render={(routerProps) => 
        <AuthContainer {...routerProps} setUser={this.setUser}/>} />
        
        <Route exact path='/profile' render={(routerProps) => 
        <UserShow currentUser={this.state.currentUser} posts={this.state.posts} {...routerProps} allMyChallenges={this.state.allMyChallenges}/>}/>
        
        {/* <Route exact path='/challenges/:topic' render={(routerProps) => 
        <>
          <h2>Challenge Topic</h2>
          <p>list of challenges within the topic, and info on each challenge</p>
        </>}/> */}

        <Route exact path='/challenges' render={(routerProps) => 
        <GenreContainer/>}/>

      </Switch>
    </div>
  )}
}

export default App;
