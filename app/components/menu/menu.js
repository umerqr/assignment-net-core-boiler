import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './menu.module.css';

const menu = () => (
  <>
    <div className="headings">
      <Button className="mr-auto">
        <Link to="/" exact className="headings">
          Brands
        </Link>
        <Link to="/userslist" className="headings">
          Users
        </Link>
        <Link to="/challengeslist" className="headings">
          Challenges
        </Link>
        <Link to="/trickslist" className="headings">
          Tricks
        </Link>
      </Button>
    </div>

    <br />
  </>
);

export default menu;
