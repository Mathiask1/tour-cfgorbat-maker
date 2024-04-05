import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function NavigationBar() {
    return (
        <div className='navbar'>
            <nav>
                <ul className='navbar'>
                    <li className='navbar'><Link to="/">Home</Link></li>
                    <li className='navbar'><Link to="http://the-tour.info/">TOUR Website</Link></li>
                </ul>
            </nav>
            <div>
                <img src='/images/tour_logo.png' alt="Image1"></img>
            </div>
        </div>

    );
}

export default NavigationBar;
