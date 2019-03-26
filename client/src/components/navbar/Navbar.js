import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
  }
  render(){
    return(
      <nav>
      <div className="insideWrapper">
        <div className="desc">
          <Link to="/topics">
            The<strong>TALK</strong>
          </Link>
        </div>
        <div className="links">
          <ul>
            <li className="menuItem"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>
            <li className="menuItem"><Link to="/signup" style={{ textDecoration: 'none' }}>Register</Link></li>
            <li className="menuItem"><Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}


// const navbar = () => {
//   return (
//     <nav>
//       <div className="insideWrapper">
//         <div className="desc">
//           <Link to="/topics">
//             The<strong>TALK</strong>
//           </Link>
//         </div>
//         <div className="links">
//           <ul>
//             <li className="menuItem"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>
//             <li className="menuItem"><Link to="/signup" style={{ textDecoration: 'none' }}>Register</Link></li>
//             <li className="menuItem"><Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link></li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

export default Navbar;