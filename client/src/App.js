import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopicList from './components/topics/TopicList';
import Navbar from './components/navbar/Navbar';
import TopicDetails from './components/topics/TopicDetails';
import CommentDetails from './components/comments/CommentDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

import AuthService from './components/auth/auth-service';

import ProtectedRoute from './components/auth/protected-routes';
import Welcome from './components/welcome/Welcome';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          {/* <Navbar userInSession={this.state.loggedInUser} /> */}
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/topics/:id' component={TopicDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path="/topics" component={TopicList} />
            <ProtectedRoute user={this.state.loggedInUser} path="/logout" component={Logout} />
            <ProtectedRoute user={this.state.loggedInUser} path="/topics/:id/comments/:commentId" component={CommentDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path="/" component={Welcome} />
            {/* <Route exact path="/topics" component={TopicList} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/topics/:id' component={TopicDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path="/topics" component={TopicList} /> */}
          </Switch>
        </div>
      )
    }
  }
}

export default App; 