import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated, user, onLogout }) {
  return (
    <header className="App-header">
      <nav className="nav">
        <Link to="/" className="nav-brand">
          💑 MatrimonialApp
        </Link>
        {isAuthenticated && (
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Browse Profiles
            </Link>
            <Link to="/my-profile" className="nav-link">
              My Profile
            </Link>
            <span className="nav-link">Hello, {user?.name}</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
