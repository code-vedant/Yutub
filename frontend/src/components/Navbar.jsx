import React from 'react';
import "../style/navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="side-navbar">
      <nav>
        <ul className='navbar-ul'>
          <li>
            <Link to='/' className="nav-link">
              <i className="Home"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to='/playlist' className="nav-link">
              <i className="PLaylist"></i>
              Playlist
            </Link>
          </li>
          <li>
            <Link to='/subscriptions' className="nav-link">
              <i className="subscriptions"></i>
              Subscriptions
            </Link>
          </li>
          <li>
            <Link to='history' className="nav-link">
              <i className="history"></i>
              History
            </Link>
          </li>
          <li>
            <Link to='settings' className="nav-link">
              <i className="settings"></i>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;