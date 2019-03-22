import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

const navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li><Link to="/projects" style={{ textDecoration: 'none' }}>Projects</Link></li>
    </ul>
    </nav>
  )
}

export default navbar;