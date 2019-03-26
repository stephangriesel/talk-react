import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CommentDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheComment();
  }

  getTheComment = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/topics/${params.id}/comments/${params.commentId}`)
    .then( responseFromApi =>{
      const theComment = responseFromApi.data;
      this.setState(theComment);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <p>{this.state.username}</p>
        <Link to={'/topics'}>Back to topics</Link>
      </div>
    )
  }
}

export default CommentDetails;