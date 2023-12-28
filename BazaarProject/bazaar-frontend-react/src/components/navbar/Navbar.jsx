import { Link, NavLink,useNavigate } from 'react-router-dom';
import   './Navbar.css';
import React, { useState } from 'react';

const Navbar = () => {

  const [searchQ, setSearchQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQ}`);
  };
  return (
    <header className="header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink  to={{ pathname: '/', search: `?pageNumber=${1}` }}>
          <img
            src="/assets/images/logo.png"
            style={{ height: '50px', width: '100px', marginRight: '20px' }}
            alt="image"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                to={{
                  pathname: '/',
                  search: `?pageNumber=${1}`,
                }}
                aria-current="page"
                className="nav-link"
              >
                <i className="fas fa-home me-1"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                <i className="fas fa-th-list me-1"></i>Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <i className="fas fa-info-circle me-1"></i>About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <i className="fas fa-paper-plane me-1"></i>Contact
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQ}
        onChange={(e) => setSearchQ(e.target.value)}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        disabled={searchQ.length < 3}
      >
        <i className="fas fa-search"></i>
      </button>
    </form>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Navbar;
