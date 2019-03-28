import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';
import AuthService from '../auth/auth-service';

export default (props) => (

  <nav className="navWrapper">
    <div className="insideWrapper">
      <div className="desc">
        {/* <Link to="/">
          The<strong>TALK</strong>
        </Link> */}
      </div>
    </div>

    {props.loggedIn ?
      <NavAuthenticated {...props} /> :
      <NavUnauthenticated {...props} />
    }
  </nav>
)

  const NavUnauthenticated = (props) => (
    <nav className="navWrapper">
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
    </nav>
  )

  const NavAuthenticated = (props) => (
    <nav className="navWrapper">
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
        </nav>
    )