import React, { Component } from 'react';
import axios from 'axios';


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
      </div>
    )
  }
}

export default CommentDetails;