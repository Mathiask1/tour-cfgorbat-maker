import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function NavigationBar() {
  return (
    <nav>
      <ul className='navbar'>
        <li className='navbar'><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
