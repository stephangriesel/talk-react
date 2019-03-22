import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddTopic from './AddTopic'; 

class TopicList extends Component {
  constructor(){
      super();
      this.state = { listOfTopics: [] };
  }

  getAllTopics = () =>{
    axios.get(`http://localhost:5000/api/topics`)
    .then(responseFromApi => {
      this.setState({
        listOfTopics: responseFromApi.data
      })
    })
  }

  componentDidMount() { // we use componentDidMount() lifecycle method to fetch the data from API
    this.getAllTopics();
  }

  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfTopics.map( topic => {
            return (
              <div key={topic._id}>
                <Link to={`/topics/${topic._id}`}> {/* don’t forget to give each element the database ID as the key with key={topic._id}) */}
                  <h3>{topic.title}</h3>
                </Link>
                {/* <ul>
                  { topic.comments.map((comment, index) => {
                    return <li key={index}>{comment.title}</li>
                  }) }
                </ul>  */}
                <p style={{maxWidth: '400px'}} >{topic.description} </p>
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            <AddTopic getData={() => this.getAllTopics()}/> {/* <== !!! */}
        </div>
      </div>
    )
  }
}

export default TopicList;