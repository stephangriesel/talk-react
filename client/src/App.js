import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopicList from './components/topics/TopicList';
import TopicListLoggedIn from './components/topics/TopicListLoggedIn';
import Navbar from './components/navbar/Navbar';
import TopicDetails from './components/topics/TopicDetails';
import CommentDetails from './components/comments/CommentDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

import AuthService from './components/auth/auth-service';

import ProtectedRoute from './components/auth/protected-routes';



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null,
      user: {}
    };
    this.service = new AuthService();
  }

  loggedIn = (loginState) => { // review auth-service.js
    const { loggedIn, user } = loginState
    this.setState({ loggedIn: loggedIn, user: user })
    localStorage.setItem("state", JSON.stringify(loginState))
  }

  logout = () => { // review auth-service.js
    // debugger
    this.setState({ user: {}, loggedIn: false })
    localStorage.setItem("state", "{}")
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
    // debugger
    this.setState({
      loggedInUser: userObj
    })
  }

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem("state")))
  }

  render() {
    // this.fetchUser()
    // if (this.state.loggedInUser) {
    return (
      <div className="App">
        <section>
          <div className="container">
            <Navbar {...this.state} logout={this.logout} />
          </div>
        </section>

        <Switch>

          <Route exact path="/" render={(props) => <TopicList test="test" {...props} user={this.state.user} userInSession={this.state.loggedInUser} getUser={this.getTheUser} />} />
          <Route path="/login" render={(props) => <Login {...props} loggedIn={this.loggedIn} />} />
          <Route path="/signup" render={(props) => <Signup {...props} loggedIn={this.loggedIn} />} />
          {/* <PrivateRoute path="/secret" component={SuperSecret} loggedIn={this.state.loggedIn} /> << JURGEN EXAMPLE */}
          <Route user={this.state.loggedInUser} path='/topics/:id' component={TopicDetails} /> {/* UNCOMMENT TO SEE TOPIC DETAILS */}


          {/* <ProtectedRoute user={this.state.loggedInUser} path='/topics/:id' component={TopicDetails} /> */}
          <Route path="/logout" render={(props) => <Logout {...props} user={this.state.loggedInUser} />} />

          <ProtectedRoute user={this.state.user} userInSession={this.state.loggedInUser} getUser={this.getTheUser} path="/topics" component={TopicListLoggedIn} />
          {/* <ProtectedRoute user={this.state.user} userInSession={this.state.loggedInUser} getUser={this.getTheUser} path='/topics/:id' component={TopicDetails} /> // */}
          <ProtectedRoute user={this.state.loggedInUser} path="/topics/:id/comments/:commentId" test="test" component={CommentDetails} />
        </Switch>
      </div>
    )
  }
  // }
}

export default App; 