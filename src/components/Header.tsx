import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Random Quote</Link>
          </li>
          <li>
            <Link to="/quotes">All Quotes</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
