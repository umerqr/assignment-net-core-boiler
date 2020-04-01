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
import UserList from '../../components/User/userList';
import BrandList from '../../components/Brand/brandList';
import TrickList from '../../components/Tricks/trickList';
import ChallengeList from '../../components/Challenge/challengeList';
import GlobalStyle from '../../global-styles';
import Brands from '../Brands/index';

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
        <Route path="/" exact component={BrandList} />
        <Route path="/userslist" exact component={UserList} />
        <Route path="/trickslist" exact component={TrickList} />
        <Route path="/challengeslist" exact component={ChallengeList} />
        <Route path="/example" exact component={Brands} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
