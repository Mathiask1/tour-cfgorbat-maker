import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import HelpModal from './HelpModal';

function NavigationBar() {
    const Modal = () => (
        <Popup trigger={<button className="button"> Open Modal </button>} modal>
            <span> Modal content </span>
        </Popup>
    );

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
                <img className='navbar' src='tour-cfgorbat-maker/images/tour_logo.png' alt="Image1"></img>
            </div>
        </div>
    );
}

export default NavigationBar;
