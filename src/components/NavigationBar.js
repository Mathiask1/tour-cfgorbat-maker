import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import 'reactjs-popup/dist/index.css';
import HelpModal from './HelpModal';

function NavigationBar() {
    return (
        <div className='navbar'>
            <nav>
                <ul className='navbar'>
                    <li className='navbar'><Link to="/">Home</Link></li>
                    <li className='navbar'><Link to="http://the-tour.info/">TOUR Website</Link></li>
                </ul>
            </nav>
            <div className='navbar-right'>
                <HelpModal />
                <img className='navbar' src='images/tour_logo.png' alt="TourLogo"></img>
            </div>
        </div>
    );
}

export default NavigationBar;
