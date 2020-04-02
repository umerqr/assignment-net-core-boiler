import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the users state domain
 */

const selectUsersDomain = state => state.users || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Users
 */

const makeSelectUsers = () =>
  createSelector(
    selectUsersDomain,
    substate => substate.users,
  );
const makeUserName = () =>
  createSelector(
    selectUsersDomain,
    substate => substate.userName,
  );
const makeSearchName = () =>
  createSelector(
    selectUsersDomain,
    substate => substate.searchUserName,
  );
export default makeSelectUsers;
export { selectUsersDomain, makeUserName, makeSearchName, makeSelectUsers };
