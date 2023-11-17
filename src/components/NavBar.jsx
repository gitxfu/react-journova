import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateUserID } from '../utils/utils';
import "./NavBar.css"

const NavBar = ({ userID, setUserID }) => {

  const navigate = useNavigate();

  const handleChangeID = () => {
    // Generate a new random ID and update it in both local storage and state
    const newUserID = generateUserID();
    localStorage.setItem('userID', newUserID);
    setUserID(newUserID);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img className="logo-image" alt="logo" src="/logo.png" />
        </li>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/create">Create</Link>
        </li>
        <li className="user">
          <img className="user-image" alt="user" src="/user.png" />
          {userID}
        </li>
        {/* <li>
          <button className="changeIDButton" onClick={handleChangeID} >Change ID</button>
        </li> */}
      </ul>
    </nav>
  );
};


export default NavBar;