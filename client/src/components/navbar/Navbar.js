import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

const navbar = () => {
  return (
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
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar;