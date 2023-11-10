import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateUserID } from '../utils/utils';

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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
        <li>
          User ID: {userID}
        </li>
        <li>
          <button className="changeIDButton" onClick={handleChangeID} >Change ID</button>
        </li>
      </ul>
      {/* <form>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
            />
            <button type="submit">Search</button>
          </form> */}
    </nav>
  );
};


export default NavBar;