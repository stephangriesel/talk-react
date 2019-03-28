import React from "react";
import { Link } from "react-router-dom";
// import Logout from "../../components/auth/Logout";
import '../../css/Navbar.css';

export default (props) => (

  <nav className="navbar" role="navigation" aria-label="main navigation">
    {props.loggedIn ?
      <NavAuthenticated {...props} /> :
      <NavUnauthenticated {...props} />
    }
  </nav>
)

const NavUnauthenticated = (props) => (

    <div className="insideWrapper">
      <div className="desc">
        <Link to="/">
          The<strong>TALK</strong>
        </Link>
      </div>
      <div className="links">
        <ul>
          <li className="menuItem"><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>
          <li className="menuItem"><Link to="/signup" style={{ textDecoration: 'none' }}>Register</Link></li>
        </ul>
      </div>
    </div>
)

const NavAuthenticated = (props) => (
    <div className="insideWrapper">
      <div className="desc">
        <Link to="/">
          The<strong>TALK</strong>
        </Link>
      </div>
      <div className="links">
        <ul>
          <li className="menuItem"><Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link></li>
        </ul>
      </div>
    </div>
)