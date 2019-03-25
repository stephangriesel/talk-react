import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

const navbar = () => {
  return (
    <nav>
      <div className="insideWrapper">
        <div className="desc">
          <Link to="/topics">
            The<strong>FORUM</strong>
          </Link>
        </div>
        <div className="links">
          <ul>
            <li className="menuItem"><Link to="/topics" style={{ textDecoration: 'none' }}>Login</Link></li>
            <li className="menuItem"><Link to="/topics" style={{ textDecoration: 'none' }}>Register</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar;