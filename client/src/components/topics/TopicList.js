import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTopic from './AddTopic';
import '../../css/TopicList.css';


class TopicList extends Component {
  constructor() {
    super();
    this.state = { listOfTopics: [] };
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

  render() {
    return (
      <div className="topicList-wrapper">
        <div>
          <AddTopic getData={() => this.getAllTopics()} />
        </div>

        <div>
          {this.state.listOfTopics.map(topic => {
            return (
              <div key={topic._id} className="topicBox">
                <Link to={`/topics/${topic._id}`}> {/* don’t forget to give each element the database ID as the key with key={topic._id}) */}
                  <h3><i className="fas fa-newspaper"></i> {topic.title}</h3>
                </Link>
                {/* <ul> // << breaks app, troubleshoot
                  { topic.comments.map((comment, index) => {
                    return <li key={index}>{comment.title}</li>
                  }) }
                </ul>  */}
                <p><i className="far fa-comments"></i> {topic.description} </p>
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