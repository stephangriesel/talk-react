import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTopic from './AddTopic';
import '../../css/TopicList.css';
import AuthService from '../../components/auth/auth-service';


class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTopics: [],
      loggedInUser: null,
      userinsessionname: this.props.user
    };
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

  getAllTopics = () => {
    axios.get(`http://localhost:5000/api/topics`,
      { withCredentials: true }
    )
      .then(responseFromApi => {
        this.setState({
          listOfTopics: responseFromApi.data
        })
      })
  }

  componentDidMount() { // we use componentDidMount() lifecycle method to fetch the data from API
    this.getAllTopics();
  }
  // debugger

  render() {
    // debugger
    return (
      <div className="topicList-wrapper">
        <div>

          <AddTopic userInSession={this.state.loggedInUser} getData={() => this.getAllTopics()} />
        </div>

        <div className="itemCards">
          {this.state.listOfTopics.map(topic => {
            return (
              <div key={topic._id} className="topicBox">
                <Link to={`/topics/${topic._id}`}> {/* don’t forget to give each element the database ID as the key with key={topic._id}) */}
                  <h3><i className="fas fa-newspaper"></i> {topic.title} by {}</h3>
                </Link>
                <p><i className="far fa-comments"></i> {topic.description} </p>
                <ul>
                  {topic.comments.map((comment, index) => {
                    return <li className="commentText" key={index}><i className="far fa-comment-dots"></i> {comment.title}</li>
                  })}
                </ul>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default TopicList;