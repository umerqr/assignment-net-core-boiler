/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from '../../components/menu/menu';
// import UserList from '../../components/User/userList';
// import BrandList from '../../components/Brand/brandList';
// import TrickList from '../../components/Trick/trickList';
// import ChallengeList from '../../components/Challenge/challengeList';
import GlobalStyle from '../../global-styles';
import Brands from '../Brands/index';
import Users from '../Users/index';
import Challenges from '../Challenges/index';
import Tricks from '../Tricks/index';

export default function App() {
  return (
    <div
      style={{
        margin: 'auto',
        width: ' 50%',
        padding: ' 10px',
      }}
    >
      <Menu />
      <Switch>
        <Route path="/" exact component={Brands} />
        <Route path="/userslist" exact component={Users} />
        <Route path="/trickslist" exact component={Tricks} />
        <Route path="/challengeslist" exact component={Challenges} />
        {/* <Route path="/example" exact component={Tricks} /> */}
      </Switch>
      <GlobalStyle />
    </div>
  );
}
