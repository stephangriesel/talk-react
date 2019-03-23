import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopicList from './components/topics/TopicList';
import Navbar from './components/navbar/Navbar';
import TopicDetails from './components/topics/TopicDetails';
import CommentDetails from './components/tasks/CommentDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navbar />
        <Switch>
          <Route exact path="/" component={TopicList} />
          <Route exact path="/topics" component={TopicList}/>
          <Route exact path="/topics/:id" component={TopicDetails} />
          <Route exact path="/topics/:id/tasks/:taskId" component={CommentDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;