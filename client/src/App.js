import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopicList from './components/topics/TopicList';
import Navbar from './components/navbar/Navbar';
import TopicDetails from './components/topics/TopicDetails';
import CommentDetails from './components/comments/CommentDetails';
import Signup from './components/auth/Signup';

import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    // this.service = new AuthService();
  }

  // fetchUser() {
  //   if (this.state.loggedInUser === null) {
  //     this.service.loggedin()
  //       .then(response => {
  //         this.setState({
  //           loggedInUser: response
  //         })
  //       })
  //       .catch(err => {
  //         this.setState({
  //           loggedInUser: false
  //         })
  //       })
  //   }
  // }

  // getTheUser = (userObj) => {
  //   this.setState({
  //     loggedInUser: userObj
  //   })
  // // }

  // render() {
  //   // this.fetchUser()
  //   if (this.state.loggedInUser) {
  //     return (
  //       <div className="App">
  //         <Navbar userInSession={this.state.loggedInUser} />
  //         <Switch>
  //           <Route exact path="/" component={TopicList} />
  //           <Route exact path="/topics" component={TopicList} />
  //           <Route exact path="/topics/:id" component={TopicDetails} />
  //           <Route exact path="/topics/:id/tasks/:taskId" component={CommentDetails} />
  //         </Switch>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="App">
  //         <Navbar userInSession={this.state.loggedInUser} />
  //         <Switch>
  //           <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
  //           <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
  //           <Route exact path="/topics" component={TopicList} />
  //           <Route exact path="/topics/:id" component={TopicDetails} />
  //         </Switch>
  //       </div>
  //     );
  //   }
  // }
}
export default App;