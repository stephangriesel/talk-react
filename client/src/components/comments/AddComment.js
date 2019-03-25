import React, { Component } from 'react';
import axios from 'axios';
import '../../css/AddComment.css';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", isShowing: false };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const topicID = this.props.theTopic._id;
    axios.post("http://localhost:5000/api/comments", { title, description, topicID })
      .then(() => {
        this.props.getTheTopic();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  }

  showAddCommentForm = () => {
    if (this.state.isShowing) {
      return (
        <div className="addCommentBox">
          {/* <h3>Add Comment</h3> */}
          <form onSubmit={this.handleFormSubmit}>
            {/* <label>Title:</label> */}
            <div className="commentText">
              <textarea type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
            </div>
            {/* <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} /> */}
            <button type="submit" value="Submit"><i className="fas fa-comment"></i> ADD</button>
          </form>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="add-comment">
        <button onClick={() => this.toggleForm()}><i className="far fa-comment"></i> Comment </button>
        {this.showAddCommentForm()}
      </div>
    )
  }
}

export default AddComment;