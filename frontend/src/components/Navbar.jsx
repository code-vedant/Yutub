import React from 'react';
import "../style/navbar.css"

const Navbar = () => {
  return (
    <div className="side-navbar">
      <nav>
        <ul className='navbar-ul'>
          <li>
            <a href="#" className="nav-link">
              <i className="home"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="trending"></i>
              Trending
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="subscriptions"></i>
              Subscriptions
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="history"></i>
              History
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <i className="settings"></i>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;