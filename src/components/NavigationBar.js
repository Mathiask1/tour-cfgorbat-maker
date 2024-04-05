import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function NavigationBar() {
  return (
    <nav className='navBar'>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
