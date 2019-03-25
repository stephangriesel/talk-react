import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditTopic from './EditTopic';
import AddComment from '../comments/AddComment';
import '../../css/TopicDetails.css';


class TopicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { // componentDidMount() is executing getSingleTopic() method which initially communicates with our backend route through axios call. If everything is successful, we are updating the state (using nothing but setState()) and equaling it to the topic object we got from our API.
    this.getSingleTopic();
  }

  getSingleTopic = () => {
    const { params } = this.props.match;
    axios({
      method: "get",
      url: `http://localhost:5000/api/topics/${params.id}`,
      withCredentials: true
    })
      .then(responseFromApi => {
        const theTopic = responseFromApi.data;
        this.setState(theTopic);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // EDIT FORM
  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleTopic();
    } else {
      return <EditTopic theTopic={this.state} getTheTopic={this.getSingleTopic} {...this.props} />

    }
  }

  // DELETE TOPIC:
  deleteTopic = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/topics/${params.id}`,
      { withCredentials: true }
    )
      .then(() => {
        this.props.history.push('/topics');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // ADD COMMENT COMPONENT
  renderAddCommentForm = () => {
    if (!this.state.title) {
      this.getSingleTopic();
    } else {
      // pass the topic and method getSingleTopic() as a props down to AddComment component
      return <AddComment theTopic={this.state} getTheTopic={this.getSingleTopic} />
    }
  }


  render() { // accessing to topic's properties through this.state.title and this.state.description.
    return (
      <div>
        <h1 className="uppercaseText">{this.state.title}</h1>
        <p>{this.state.description}</p>


        {/* show the comment heading only if there are comments */}
        {this.state.comments && this.state.comments.length > 0 && <h3>Comments </h3>}
        {/* map through the array of comments and... */}
        {this.state.comments && this.state.comments.map((comment, index) => {
          return (
            <div className="commentLine" key={index}>
              {/* ... make each comment's title a link that goes to the comment details page */}
              <div><i className="fas fa-comment-dots"></i></div>
              <Link to={`/topics/${this.state._id}/comments/${comment._id}`}> 
                {comment.title}
              </Link>
            </div>
          )
        })}

        <div className="commentBtn">{this.renderAddCommentForm()} </div>


        <div>{this.renderEditForm()}</div> {/* called inside the render() method and what it does is basically this: checks if this.state has any properties (we picked title), and if that’s true, it’s invoking the getSingleTopic() method which gets the topic object from our API and sets it to the state of the component. On the next execution of renderEditForm(), it’s rendering <EditTopic /> component with props passed down to itself.*/}
        <div>
          <button className="btnRed" onClick={() => this.deleteTopic()}>Delete topic</button>
        </div>
        <div className="textNav">
          <Link to={'/topics'}><i className="fas fa-arrow-left"></i> Back to topics</Link>
        </div>
      </div>
    )
  }
}

export default TopicDetails;