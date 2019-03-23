import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

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

export default navbar;