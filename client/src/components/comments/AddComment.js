import React, { Component } from 'react';
import axios from 'axios';

class AddComment extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add Comment form   
                            //                      |
      this.state = { title: "", description: "", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const topicID = this.props.theTopic._id; // <== we need to know to which topic the created Comment belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing topic 
                                                // by its id in the Comment model on the server side ( topic: {type: Schema.Types.ObjectId, ref: 'topic'})
    
    // { title, description, topicID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post("http://localhost:5000/api/comments", { title, description, topicID })
    .then( () => {
          // after submitting the form, retrieve topic one more time so the new Comment is displayed as well 
          //              |
        this.props.getTheTopic();
        this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showAddCommentForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Add Comment</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Title:</label>
                  <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add Comment </button>
            { this.showAddCommentForm() }
      </div>
    )
  }
}

export default AddComment;