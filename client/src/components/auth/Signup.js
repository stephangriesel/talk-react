// import React, { Component } from 'react';
// import AuthService from './auth-service';
// import { Link } from 'react-router-dom';

// class Signup extends Component {
//   constructor(props){
//     super(props);
//     this.state = { username: '', password: '' };
//     this.service = new AuthService(); // instance of AuthService
//   }

// //   handleChange() and handleSubmit() will be added here

//   render(){
//     return(
//         <h1>test</h1>
//     )
//   }
// }

// // SUBMIT HELPER
// handleFormSubmit = (event) => {
//     event.preventDefault();
//     const username = this.state.username;
//     const password = this.state.password;
  
//     this.service.signup(username, password)
//     .then( response => {
//         this.setState({
//             username: "", 
//             password: "",
//         });
//         this.props.getUser(response) // contains user object from sign up component
//     })
//     .catch( error => console.log(error) )
//   }
  
//   // CHANGE HELPER
//   handleChange = (event) => {  
//     const {name, value} = event.target;
//     this.setState({[name]: value});
//   }
      
//   // FORM
//   render();{
//     return(
//       <div>
//         <form onSubmit={this.handleFormSubmit}>
//           <label>Username:</label>
//           <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
//           <label>Password:</label>
//           <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
//           <input type="submit" value="Signup" />
//         </form>
  
//         <p>Already have account? 
//             <Link to={"/"}> Login</Link>
//         </p>
  
//       </div>
//     )
//   }

// export default Signup;