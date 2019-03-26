import React, { Component } from 'react';
import axios from 'axios';
import '../../css/AddTopic.css';
import AuthService from '../auth/auth-service';


class AddTopic extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.state = { title: "", description: "", owner: "" }; // << QUESTION FOR TA: this might be the reason why it is not working, I am not passing user, but if I do I can't get it to work?
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const owner = this.state.owner;
    axios.post("http://localhost:5000/api/topics",
      {
        title, description, owner
      },
      {
        withCredentials: true
      }
    )
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "", owner: "" });
        debugger
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

  showAddTopicForm = () => {
    if (this.state.isShowing) {
      return (
        <div className="addTopic-wrapper">
          <form onSubmit={this.handleFormSubmit}>
            {/* <label>Title:</label> */}
            <div className="topicTitle">
              <input type="text" name="title" placeholder="... start a discussion" value={this.state.title} onChange={e => this.handleChange(e)} />
            </div>
            {/* <label>Description:</label> */}
            <div className="topicDesc">
              <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
            </div>
            <button type="submit" value="Submit">SUBMIT</button>
          </form>
        </div>
      )
    }
  }

  // SHOW BUTTON IF LOGGED IN

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
  }

  // SHOW BUTTON IF LOGGED IN END

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className="addTopic-wrapper">
          <button onClick={() => this.toggleForm()}>
            <i className="far fa-comments"></i> Join the discussion</button>
          {this.showAddTopicForm()}
        </div>
      )
    } else {
      return (
        <div className="addTopic-wrapper">
          <button onClick={() => this.toggleForm()}>
            <i className="far fa-comments"></i> REGISTER TO JOIN THE DISCUSSION</button>
          {/* {this.showAddTopicForm()} */}
        </div>
      )
    }
  }
}

export default AddTopic;