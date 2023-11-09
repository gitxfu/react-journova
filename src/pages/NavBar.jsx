import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ()=> {
    
    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
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