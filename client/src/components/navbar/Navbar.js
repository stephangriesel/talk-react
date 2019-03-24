import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

const navbar = () => {
  return (
    <nav>
      <div class="insideWrapper">
        <div className="desc">The<strong>FORUM</strong></div>
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