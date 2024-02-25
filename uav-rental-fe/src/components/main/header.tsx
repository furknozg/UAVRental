import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/main">UAV Market</Link>
          </li>
          <li>
            <Link to="/my-uavs">My UAVs</Link>
          </li>
          <li>
            <Link to="/my-rentals">My Rentals</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
