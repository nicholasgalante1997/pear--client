import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/forum' render={(routerProps) => 
        <h2>Hello World.</h2>}/>
        <Route exact path='/login' render={(routerProps) => 
        <h2>Log In Page</h2>} />
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
  );
}

export default App;
