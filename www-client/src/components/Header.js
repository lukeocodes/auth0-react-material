import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Welcome to React</h1>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/videos'>Videos</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;