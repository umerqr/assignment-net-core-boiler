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
    substate => substate,
  );

export default makeSelectTricks;
export { selectTricksDomain };
