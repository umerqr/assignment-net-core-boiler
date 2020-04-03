import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tricks state domain
 */

const selectTricksDomain = state => state.tricks || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tricks
 */

const makeSelectTricks = () =>
  createSelector(
    selectTricksDomain,
    substate => substate.tricks,
  );
const makeTrickName = () =>
  createSelector(
    selectTricksDomain,
    substate => substate.tricksName,
  );
const makeUserId = () =>
  createSelector(
    selectTricksDomain,
    substate => substate.userIdToAdd,
  );
const makeChallengeId = () =>
  createSelector(
    selectTricksDomain,
    substate => substate.challengeIdToAdd,
  );
const makeSearchName = () =>
  createSelector(
    selectTricksDomain,
    substate => substate.searchTrickName,
  );

export default makeSelectTricks;
export {
  selectTricksDomain,
  makeTrickName,
  makeSearchName,
  makeSelectTricks,
  makeUserId,
  makeChallengeId,
};
