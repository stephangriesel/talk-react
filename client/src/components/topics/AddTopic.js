import React, { Component } from 'react';
import axios from 'axios';

class AddTopic extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "", owner: "" }; // << QUESTION FOR TA: this might be the reason why it is not working, I am not passing user, but if I do I can't get it to work?
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const owner = this.state.owner;
    axios.post("http://localhost:5000/api/topics", { 
      title, description, owner
    }) 
    .then( () => {
        this.props.getData();
        this.setState({title: "", description: "", owner: "" }); 
        debugger
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div>
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

export default AddTopic;