import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../tasks/AddTask';

class ProjectDetails extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }

  componentDidMount(){ // componentDidMount() is executing getSingleProject() method which initially communicates with our backend route through axios call. If everything is successful, we are updating the state (using nothing but setState()) and equaling it to the project object we got from our API.
      this.getSingleProject();
  }

  getSingleProject = () => {
      const { params } = this.props.match;
      axios({
          method: "get",
          url: `http://localhost:5000/api/projects/${params.id}`,
          withCredentials: true
      })
      .then( responseFromApi =>{
          const theProject = responseFromApi.data;
          this.setState(theProject);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  // EDIT FORM
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleProject();
    } else {
      return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        
    }
  }

  // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/projects/${params.id}`)
    .then( () =>{
        this.props.history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  // ADD TASK COMPONENT
  renderAddTaskForm = () => {
    if(!this.state.title){
        this.getSingleProject();
      } else {     
                // pass the project and method getSingleProject() as a props down to AddTask component
        return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
      }
  }


  render(){ // accessing to project’s properties through this.state.title and this.state.description.
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        {/* show the task heading only if there are tasks */}
        { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
        {/* map through the array of tasks and... */}
        { this.state.tasks && this.state.tasks.map((task, index) => {
            return(
                <div key={ index }>
                {/* ... make each task's title a link that goes to the task details page */}
                    <Link to={`/projects/${this.state._id}/tasks/${task._id}`}> 
                        { task.title }
                    </Link>
                </div>
            )
        }) }

        <div>{this.renderEditForm()}</div> {/* called inside the render() method and what it does is basically this: checks if this.state has any properties (we picked title), and if that’s true, it’s invoking the getSingleProject() method which gets the project object from our API and sets it to the state of the component. On the next execution of renderEditForm(), it’s rendering <EditProject /> component with props passed down to itself.*/}
        <div><button onClick={() => this.deleteProject()}>Delete project</button></div> {/* no button? */}
        <div>{this.renderAddTaskForm()} </div>
        <Link to={'/projects'}>Back to projects</Link>
      </div>
    )
  }
}

export default ProjectDetails;