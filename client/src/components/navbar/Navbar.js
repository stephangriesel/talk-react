import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';
// import AuthService from '../auth/auth-service';

// class Navbar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { loggedInUser: null };
//     this.service = new AuthService();
//   }

//   componentWillReceiveProps(nextProps) { // method that is called before a component does anything with the new props
//     this.setState({
//       ...this.state, loggedInUser: nextProps["userInSession"]
//     });
//   }

//   logoutUser = () => {
//     this.service.logout()
//       .then(() => {
//         this.setState({ loggedInUser: null });
//         this.props.getUser(null);
//       })
//   }

//   render() {
//     if (this.state.loggedInUser) {
//       return (
//         <nav className="nav-style">
//           <ul>
//             <li>Welcome, {this.state.loggedInUser.username}</li>
//             <li>
//               <Link to='/topics' style={{ textDecoration: 'none' }}>Topics</Link>
//             </li>
//             <li>
//               <Link to='/'>
//                 <button onClick={() => this.logoutUser()}>Logout</button>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       )
//     } else {
//       return (
//         <div>
//           <nav className="nav-style">
//             <ul>
//               <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
//               <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
//             </ul>
//           </nav>
//         </div>
//       )
//     }
//   }
// }

const navbar = () => {
  return (
    <nav className="nav">
      <div className="desc">TheFORUM</div>
      <div className="links">
        <ul>
          <li><Link to="/topics" style={{ textDecoration: 'none' }}>Login</Link></li>
          <li><Link to="/topics" style={{ textDecoration: 'none' }}>Register</Link></li>
        </ul>
      </div>

    </nav>
  )
}

// export default Navbar;
export default navbar;