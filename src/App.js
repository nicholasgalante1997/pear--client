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
import * as action from './modules/actions/actionCreators'
import {connect} from 'react-redux'

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
    editPost: false,
    editComment: false 
  }  

  // COMPONENT LIFECYCLE METHODS
  componentDidUpdate (prevProps, prevState) {
    if (prevState.editPost !== this.state.editPost) {
      this.fetchPosts()
    } else if (prevState.editComment !== this.state.editComment){
      this.fetchPosts()
    }
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
    this.fetchNotes()
    this.fetchComments()
  }

  // BACKEND FETCHES 

  fetchUsers = () => {
      fetch('http://localhost:3001/api/v1/users')
      .then(r => r.json())
      .then(users => this.props.setUsers(users))
    }
  
  fetchMyChallenges = () => {
    fetch('http://localhost:3001/api/v1/my_challenges')
    .then(r => r.json())
    .then(myChallenges => this.props.setMyChallenges(myChallenges))
  }

 fetchPosts = () => {
    fetch('http://localhost:3001/api/v1/posts')
    .then(r => r.json())
    .then(posts => this.props.setPosts(posts))
  }

  fetchNotes = () => {
    fetch('http://localhost:3001/api/v1/notes')
    .then(r => r.json())
    .then(notes => this.props.setNotes(notes))
}

  fetchComments = () => {
    fetch('http://localhost:3001/api/v1/comments')
    .then(r => r.json())
    .then(comments => this.props.setComments(comments))
  }

  // CHALLENGES CAN LIVE IN LOCAL STORAGE 
  fetchChallenges = () => {
    fetch('http://localhost:3001/api/v1/challenges')
    .then(r => r.json())
    .then(challenges => {
      this.sortChallenges(challenges)
      }
      )
  }

  //HELPER METHOD FOR FETCH CHALLENGES METHOD
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
  
  // AUTH METHODS

  //HELPER METHOD FOR COMPONENTDIDMOUNT AUTO LOGIN, NOT IN COMPONENT DID MOUNT CURRENTLY
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
          currentUser: response
        })}
      })
    }
  }

  // LOGOUT METHOD
  logout = () => {
    this.setState({
      currentUser: null
    }, () => {
      localStorage.removeItem('token')
    })
    this.props.history.push('/login')
  }

  // TOKEN SET AND CURRENT USER SET METHOD
  setUser = (response) => {
    this.setState({
      currentUser: response.user 
    }, () => {
      localStorage.token = response.token
      this.props.history.push('/forum')
    })
  }

  // UPDATE CURRENT USER INFO METHOD 
  updateCurrentUser = (user) => {
    this.setState({
      currentUser: user 
    })
  }



  render () {
    return (
    <div className="App">
      {/* NAVBAR */}
      <NavBar logout={this.logout} currentUser={this.state.currentUser}/>

      {/* BEGIN ROUTES */}
      <Switch>

      {/* CHALLENGE CONTAINER ROUTES */}
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
        
        {/* GENERAL CHALLENGE ROUTE */}
        <Route exact path='/challenges' render={(routerProps) => 
        <GenreContainer/>}/>

        {/* FORUM CONTAINER ROUTE */}
        <Route exact path='/forum' render={(routerProps) => 
        <ForumContainer {...routerProps}
         challenges={this.state.challenges} 
         users={this.state.users} 
         currentUser={this.state.currentUser} 
         />}/>

        {/* AUTH CONTAINER ROUTE */}
        <Route exact path='/login' render={(routerProps) => 
        <AuthContainer {...routerProps} setUser={this.setUser}/>} />
        
        {/* LOGIN CONRAINER ROUTE */}
        <Route exact path='/profile' render={(routerProps) => 
        <UserShow 
        currentUser={this.state.currentUser} 
        {...routerProps} 
        updateCurrentUser={this.updateCurrentUser}/>}/>

         

      </Switch>
    </div>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    setPosts: (posts) => dispatch(action.setPosts(posts)),
    setUsers: (users) => dispatch(action.setUsers(users)),
    setMyChallenges: (my_challenges) => dispatch(action.setMyChallenges(my_challenges)),
    setNotes: (notes) => dispatch(action.setNotes(notes)),
    setComments: (comments) => dispatch(action.setComments(comments))
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


// TOGGLE METHODS FOR THE EDIT FORMS, MAY NOT NEED AFTER REDUX REFACTOR

// toggleForEditPost = () => {
//   this.setState(prevState => {
//     return {
//       editPost: !prevState.editPost
//     }
//   })
// }

// toggleForEditComment = () => {
//   this.setState(prevState => {
//     return {
//       editComment: !prevState.editComment
//     }
//   })
// }